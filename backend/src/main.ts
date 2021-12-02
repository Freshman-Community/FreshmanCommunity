import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'FRESH_SESSIONID',
      proxy: true,
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
