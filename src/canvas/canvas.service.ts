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

  async findAllByGuid(guid: string): Promise<any> {
    const reulst = this.canvasRepository.find({
      where: {
        guid,
      },
    });
    return {
      code: 200,
      data: {
        ...reulst,
      },
    };
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
  }): Promise<any> {
    const result = await this.canvasRepository.find({
      where: {
        guid: canvasId,
      },
    });
    return {
      code: 200,
      data: {
        data: result,
      },
    };
  }

  async setCanvasData(canvasMeta: canvasMeta): Promise<any> {
    const canvas = new Canvas();
    canvas.guid = canvasMeta.guid;
    canvas.key = canvasMeta.key;
    canvas.height = canvasMeta.height;
    canvas.width = canvasMeta.width;
    canvas.data = canvasMeta.data;
    const result = await this.canvasRepository.save(canvas);
    return result;
  }

  async insertGuid(): Promise<any> {
    return Promise.resolve({
      code: 200,
      data: {
        guid: uuidv4(),
      },
    });
  }
}
