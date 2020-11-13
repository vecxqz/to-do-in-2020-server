import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesService } from './pages.service';
import { Pages } from '../entities/pages.entry';

@Module({
  imports: [TypeOrmModule.forFeature([Pages])],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
