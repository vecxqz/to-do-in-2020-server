import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CanvasModule } from './canvas/canvas.module';
import { PagesModule } from './pages/pages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canvas } from './entities/canvas.entry';
import { Pages } from './entities/pages.entry';
import { User } from './entities/user.entry';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.databasePassword,
      database: process.env.databaseName,
      entities: [Canvas, Pages, User],
      synchronize: true,
    }),
    CanvasModule,
    PagesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
