import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { Observable, Subject } from 'rxjs';
import { envConfig } from '../../config/environment.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SseService implements OnModuleDestroy {
  private redisClient: Redis;
  private redisSub: Redis;
  private redisPub: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: envConfig.getRedisHost(),
      port: envConfig.getRedisPort(),
      password: envConfig.getRedisPassword(),
    });

    this.redisSub = this.redisClient.duplicate();
    this.redisPub = this.redisClient.duplicate();

    console.log(
      '🔗 Connected to Redis: ',
      envConfig.getRedisHost(),
      envConfig.getRedisPort(),
    );
  }

  async registerClient(userId: string): Promise<Observable<MessageEvent>> {
    await this.redisClient.sadd('sse-clients', userId);
    const subject = new Subject<MessageEvent>();

    const userChannel = `sse-client-${userId}`;
    this.redisSub.subscribe(userChannel);
    this.redisSub.on('message', (channel, message) => {
      if (channel === userChannel) {
        subject.next(JSON.parse(message));
      }
    });

    return subject.asObservable();
  }

  async sendNotification(userId: string, data: any) {
    const eventId = uuidv4();
    await this.redisPub.publish(
      `sse-client-${userId}`,
      JSON.stringify({ userId, data, eventId }),
    );
  }

  async removeClient(userId: string) {
    await this.redisClient.srem('sse-clients', userId);
    await this.redisSub.unsubscribe(`sse-client-${userId}`);
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
    await this.redisPub.quit();
    await this.redisSub.quit();
  }
}
