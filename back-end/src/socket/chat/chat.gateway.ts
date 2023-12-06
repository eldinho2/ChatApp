import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RedisIoAdapter } from '../adapter/RedisIoAdapter';
interface ExtendedSocket extends Socket {
  conversationId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly redisIoAdapter: RedisIoAdapter) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: ExtendedSocket,
    @MessageBody() data: any,
  ): Promise<void> {
    client.conversationId = data.conversationId;
    client.join(data.conversationId);

    console.log(data.conversationId);

    if (data.conversationId.id) {
      const messages = await this.redisIoAdapter.getMessages(
        data.conversationId.id,
      );
      client.emit('load_messages', messages);
    }
  }

  @SubscribeMessage('send_message')
  async handleEvent(
    @ConnectedSocket() client: ExtendedSocket,
    @MessageBody() data: any,
  ): Promise<void> {
    console.log(data.conversationId.id);
    await this.redisIoAdapter.storeMessage(data.conversationId.id, data);
    this.server.emit('recive_message', data);
  }

  @SubscribeMessage('is_typing')
  handleTyping(
    @ConnectedSocket() client: ExtendedSocket,
    @MessageBody() data: any,
  ): void {
    client.broadcast.to(data.conversationId).emit('is_typing', data);
  }
}
