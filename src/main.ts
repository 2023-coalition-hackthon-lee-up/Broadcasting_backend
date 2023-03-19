import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { EventsModule } from './events/events.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(EventsModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
