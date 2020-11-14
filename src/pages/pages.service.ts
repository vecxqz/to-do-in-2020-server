import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pages } from '../entities/pages.entry';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private pageRepository: Repository<Pages>,
  ) {}

  async setPagesData(pageMeta: pageMeta): Promise<Pages> {
    const pages = new Pages();
    const { canvasId, userId, data } = pageMeta;
    pages.canvasId = canvasId;
    pages.userId = userId;
    pages.data = JSON.stringify(data);
    await this.removePagesData({
      userId,
      canvasId,
    });
    const result = await this.pageRepository.save(pages);
    return result;
  }

  async getPagesData({
    userId,
    canvasId,
  }: {
    userId: string;
    canvasId: string;
  }): Promise<Pages> {
    const result = await this.pageRepository.findOne({
      where: {
        userId,
        canvasId,
      },
    });
    return result;
  }

  async removePagesData({ userId, canvasId }: any): Promise<any> {
    return this.pageRepository.delete({
      userId,
      canvasId,
    });
  }
}
