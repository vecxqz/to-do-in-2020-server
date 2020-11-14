import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Canvas } from '../entities/canvas.entry';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CanvasService {
  constructor(
    @InjectRepository(Canvas)
    private canvasRepository: Repository<Canvas>,
  ) {}

  findAll(): Promise<Canvas[]> {
    return this.canvasRepository.find();
  }

  findAllByGuid(guid: string): Promise<Canvas[]> {
    return this.canvasRepository.find({
      where: {
        guid,
      },
    });
  }

  findOne(guid: string): Promise<Canvas> {
    return this.canvasRepository.findOne(guid);
  }

  async remove(guid: string): Promise<any> {
    return this.canvasRepository.delete({
      guid,
    });
  }

  async getCanvasData({
    userId,
    canvasId,
  }: {
    userId: string;
    canvasId: string;
  }): Promise<Canvas[]> {
    return this.canvasRepository.find({
      where: {
        guid: canvasId,
      },
    });
  }

  async setCanvasData(canvasMeta: canvasMeta): Promise<Canvas> {
    const canvas = new Canvas();
    canvas.guid = canvasMeta.guid;
    canvas.key = canvasMeta.key;
    canvas.height = canvasMeta.height;
    canvas.width = canvasMeta.width;
    canvas.data = canvasMeta.data;
    const result = await this.canvasRepository.save(canvas);
    return result;
  }

  async insertGuid(): Promise<string> {
    return Promise.resolve(uuidv4());
  }
}
