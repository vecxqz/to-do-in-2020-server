import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PagesService } from './pages.service';

@UseGuards(AuthGuard('jwt'))
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}
  @Get('imagedata/:cavasId')
  getPages(@Request() req, @Param('cavasId') canvasId): any {
    const {
      user: { id: userId },
    } = req;
    return this.pagesService.getPagesData({
      userId,
      canvasId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('imagedata')
  setPages(@Request() req, @Body() body): any {
    const {
      user: { id: userId },
    } = req;
    const { canvasId, data } = body;
    return this.pagesService.setPagesData({ canvasId, data, userId });
  }
}
