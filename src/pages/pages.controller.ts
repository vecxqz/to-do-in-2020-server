import { Controller, Get, Param } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}
  @Get('guid/:guid')
  getPages(@Param('guid') guid): any {
    return this.pagesService.getPagesData(guid);
  }
}
