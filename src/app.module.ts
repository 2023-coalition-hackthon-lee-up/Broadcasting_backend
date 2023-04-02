import { Module } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [EventsGateway, AppService],
})
export class AppModule {}
