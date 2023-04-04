import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  
  await app.listen(port);
  Logger.log(`Application running on port ${ port }`)
  // 어떤 포트에서 앱이 시작되었다
}
bootstrap();
