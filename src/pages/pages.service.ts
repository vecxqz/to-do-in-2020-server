import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pages } from '../entities/pages.entry';
import { Canvas } from '../entities/canvas.entry';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private pageRepository: Repository<Pages>,
    @InjectRepository(Canvas)
    private canvasRepository: Repository<Canvas>,
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

  // https://github.com/typeorm/typeorm/blob/21b51f3f0159c333c55bc2bb6e7b508d29182885/docs/zh_CN/README.md
  // https://stackoverflow.com/questions/62760579/typeorm-select-alias-of-column-name
  async getAllPagesData({ userId }: { userId: string }): Promise<any> {
    const result = await this.pageRepository
      .createQueryBuilder()
      .select(['id', 'canvasId AS guid', 'data'])
      .where({ userId })
      .getRawMany();
    return {
      code: 200,
      data: {
        data: result,
      },
    };
  }

  async getSinglePagesData({
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
    const pageResult = this.pageRepository.delete({
      userId,
      canvasId,
    });
    const canvasResult = this.canvasRepository.delete({
      guid: canvasId,
    });
    return {
      code: 200,
      msg: '删除成功',
    };
  }

  async setPagesTitle({ title, canvasId, userId }: any): Promise<any> {
    const pages = await this.pageRepository.findOne({
      where: { canvasId, userId },
    });
    const data = JSON.parse(pages.data);
    data.title = title;
    pages.data = JSON.stringify(data);
    const pageResult = await this.pageRepository.save(pages);
    return {
      code: 200,
      msg: '修改成功',
    };
  }
}
