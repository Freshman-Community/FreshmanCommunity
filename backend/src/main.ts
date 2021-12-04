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
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'X-Requested-With',
      'remember-me',
    ],
  });
  await app.listen(443);
}
bootstrap();
