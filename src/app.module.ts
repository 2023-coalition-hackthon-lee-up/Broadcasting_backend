import { Module } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
