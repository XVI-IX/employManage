import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { Observable, Subject } from 'rxjs';
import { envConfig } from '../../config/environment.config';

@Injectable()
export class SseService implements OnModuleDestroy {
  private redisClient: Redis;
  private redisSub: Redis;
  private redisPub: Redis;

  private clients = new Map<string, Subject<any>>();

  constructor() {
    this.redisClient = new Redis({
      host: envConfig.getRedisHost(),
      port: envConfig.getRedisPort(),
      password: envConfig.getRedisPassword(),
    });

    this.redisSub = this.redisClient.duplicate();
    this.redisPub = this.redisClient.duplicate();

    this.redisSub.subscribe('sse-notifications', (err) => {
      if (err) {
        console.error(err);
      }
    });

    this.redisSub.on('message', (channel, message) => {
      if (channel === 'sse-notifications') {
        const { userId, data } = JSON.parse(message);
        this.sendNotification(userId, data);
      }
    });

    console.log(
      '🔗 Connected to Redis: ',
      envConfig.getRedisHost(),
      envConfig.getRedisPort(),
    );
  }

  async registerClient(userId: string): Promise<Observable<any>> {
    if (!this.clients.has(userId)) {
      this.clients.set(userId, new Subject<any>());
    }

    await this.redisClient.sadd('sse-clients', userId);
    return this.clients.get(userId).asObservable();
  }

  async sendNotification(userId: string, data: any) {
    await this.redisPub.publish(
      'sse-notifications',
      JSON.stringify({ userId, data }),
    );

    if (this.clients.has(userId)) {
      this.clients.get(userId).next(data);
    }
  }

  async removeClient(userId: string) {
    if (this.clients.has(userId)) {
      this.clients.get(userId).complete();
      this.clients.delete(userId);
    }

    await this.redisClient.srem('sse-clients', userId);
  }

  async onModuleDestroy() {
    this.clients.forEach((subject) => subject.complete());
    this.clients.clear();

    await this.redisClient.quit();
    await this.redisPub.quit();
    await this.redisSub.quit();
  }
}
