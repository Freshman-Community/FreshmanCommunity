import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('/certs/live/seheon.email/privkey.pem'),
    cert: readFileSync('/certs/live/seheon.email/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
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
  app.enableCors({
    origin: 'https://seheon.email',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
