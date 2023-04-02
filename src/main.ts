import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { EventsModule } from './events/events.module';
import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:3000',
      'https://2023-coalition-hackthon-lee-up.github.io/Broadcasting_frontend/',
    ], // set the allowed origin(s)
    //origin: ['*'], // set the allowed origin(s)
    optionsSuccessStatus: 200, // set the status code for successful CORS preflight requests
  };
  app.enableCors(corsOptions);

  await app.listen(8080);
}
bootstrap();
