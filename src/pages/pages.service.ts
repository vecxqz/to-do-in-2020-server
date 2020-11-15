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

  async setPagesData(pageMeta: pageMeta): Promise<any> {
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
    return {
      code: 200,
      data: {
        ...result,
      },
    };
  }

  async getPagesData({
    userId,
    canvasId,
  }: {
    userId: string;
    canvasId: string;
  }): Promise<any> {
    const result = await this.pageRepository.findOne({
      where: {
        userId,
        canvasId,
      },
    });
    return {
      code: 200,
      data: {
        ...result,
      },
    };
  }

  async removePagesData({ userId, canvasId }: any): Promise<any> {
    return this.pageRepository.delete({
      userId,
      canvasId,
    });
  }
}
