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
    pages.canvasId = pageMeta.canvasId;
    pages.userId = pageMeta.userId;
    pages.data = pageMeta.data;
    const result = await this.pageRepository.save(pages);
    return result;
  }

  async getPagesData(canvasId: string): Promise<Pages> {
    const result = await this.pageRepository.findOne(canvasId);
    return result;
  }
}
