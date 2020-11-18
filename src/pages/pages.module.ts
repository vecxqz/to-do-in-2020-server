import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesService } from './pages.service';
import { Pages } from '../entities/pages.entry';
import { Canvas } from '../entities/canvas.entry';

@Module({
  imports: [TypeOrmModule.forFeature([Pages, Canvas])],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
