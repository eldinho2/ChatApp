import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const redisURL = process.env.REDIS_URL;

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: redisURL });
    const subClient = pubClient.duplicate();

    pubClient.on('error', (err) => {
      console.error('Erro no cliente Redis (publicação):', err);
    });
    subClient.on('error', (err) => {
      console.error('Erro no cliente Redis (subscrição):', err);
    });

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    server.adapter(this.adapterConstructor);
    return server;
  }
}
