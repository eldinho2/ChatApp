import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RedisIoAdapter } from '../adapter/RedisIoAdapter';
@Module({
  providers: [ChatGateway, RedisIoAdapter],
})
export class ChatModule {}
