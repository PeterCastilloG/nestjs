import { NestFactory } from '@nestjs/core';
import { AppModule } from './infastructure/config/bootstrap'
import config from './infastructure/config/enviroment';
import { INestApplication } from '@nestjs/common';
import { statusCode, statusResponse } from './utils/http-status-codes';
import { type NextFunction, type Request, type Response } from 'express';

class APP {
  private readonly app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  init() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        next(err);
      },
    );
    this.app.use((req: Request, res: Response) => {
      res.status(statusCode.NOT_FOUND).json(statusResponse.NOT_FOUND);
    });
    this.app.use((err: any, req: Request, res: Response) => {
      const { code, message, stack } = err;
      res.status(code).json({ success: false, stack, message });
    });
    return this.app;
  }
}

async function bootstrap() {
  const app = new APP(
    await NestFactory.create(AppModule, {
      cors: true,
      bodyParser: true,
    }),
  );
  await app.init().listen(config.app.port);
}

bootstrap();
