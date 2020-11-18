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

  @Get('imagedata')
  getPages(@Request() req): any {
    const {
      user: { id: userId },
    } = req;
    return this.pagesService.getAllPagesData({
      userId,
    });
  }

  @Get('imagedata/:cavansId')
  getPage(@Request() req, @Param('cavansId') canvasId): any {
    const {
      user: { id: userId },
    } = req;
    return this.pagesService.getSinglePagesData({
      userId,
      canvasId,
    });
  }

  @Post('delete/:cavansId')
  deletPage(@Request() req, @Param('cavansId') canvasId): any {
    const {
      user: { id: userId },
    } = req;
    return this.pagesService.removePagesData({
      userId,
      canvasId,
    });
  }

  @Post('imagedata')
  setPages(@Request() req, @Body() body): any {
    const {
      user: { id: userId },
    } = req;
    const { canvasId, data } = body;
    return this.pagesService.setPagesData({ canvasId, data, userId });
  }

  @Post('title/:cavansId')
  setPagesTitle(@Request() req, @Param('cavansId') canvasId, @Body() body): any {
    const {
      user: { id: userId },
    } = req;
    const { title } = body;
    return this.pagesService.setPagesTitle({ title, canvasId, userId });
  }
}
