import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}
  @Get('imagedata/:userId/:cavasId')
  getPages(@Param('userId') userId, @Param('cavasId') canvasId): any {
    return this.pagesService.getPagesData({
      userId,
      canvasId,
    });
  }

  @Post('imagedata')
  setPages(@Body() body): any {
    return this.pagesService.setPagesData(body);
  }
}
