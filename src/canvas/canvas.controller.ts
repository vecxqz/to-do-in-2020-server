import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CanvasService } from './canvas.service';
import { v4 as uuidv4 } from 'uuid';
// import { pages } from './mock';
// https://stackoverflow.com/questions/55620592/react-node-trouble-sending-imagedata-to-server
// https://docs.nestjs.cn/7/techniques?id=%e6%96%87%e4%bb%b6%e4%b8%8a%e4%bc%a0
// https://github.com/expressjs/multer#multeropts
@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get('all')
  getAllcanvas(): any {
    return this.canvasService.findAll();
  }

  @Get('guid/:guid')
  getCanvas(@Param('guid') guid): any {
    return this.canvasService.findAllByGuid(guid);
  }

  @Get('guid')
  createGuid(): any {
    return this.canvasService.insertGuid();
  }

  @Post('pagemeta')
  setPageMeta(@Body() body) {
    return body;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('imagedata')
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: fileFilter,
    }),
  )
  async setCanvasImagedata(
    @UploadedFiles() data: any,
    @Body() body,
  ): Promise<any> {
    const result = [];
    const o = {};
    const { guid } = body;
    await this.canvasService.remove(guid);
    data.forEach((d) => {
      const keySplit = d.fieldname.split('.');
      let key = '';
      if (keySplit.length === 2) {
        key = keySplit[0];
        const re = /\d+/g;
        const result = key.match(re);
        const obj = {
          type: 'page',
          pageIndex: result[0],
        };
        o[`${key}`] = {
          key: JSON.stringify(obj),
          width: parseInt(body[`${key}.width`]),
          height: parseInt(body[`${key}.height`]),
          data: d.buffer,
        };
      }
      if (keySplit.length === 3) {
        key = `${keySplit[0]}.${keySplit[1]}`;
        const re = /\d+/g;
        const result = key.match(re);
        const obj = {
          type: 'layer',
          pageIndex: result[0],
          layerIndex: result[1],
        };
        o[`${key}`] = {
          key: JSON.stringify(obj),
          width: parseInt(body[`${key}.width`]),
          height: parseInt(body[`${key}.height`]),
          data: d.buffer,
        };
      }
      o[`${key}`].guid = guid;
      result.push(this.canvasService.setCanvasData(o[`${key}`]));
    });
    const res = await Promise.all(result);
    return {
      code: 200,
      data: {
        ...res,
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('imagedata/:cavasId')
  getPages(@Request() req, @Param('cavasId') canvasId): any {
    const {
      user: { id: userId },
    } = req;
    return this.canvasService.getCanvasData({
      userId,
      canvasId,
    });
  }
}

function fileFilter(req, file, cb) {
  const flag = file.fieldname.includes('imageData');
  if (flag) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error('文件类型错误'));
  }
}
