import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canvas } from '../entities/canvas.entry';

@Module({
  imports: [TypeOrmModule.forFeature([Canvas])],
  controllers: [CanvasController],
  providers: [CanvasService],
})
export class CanvasModule {}
