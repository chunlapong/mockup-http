import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(process.env.CONSUMER_TOPIC ?? '')
  consume(@Payload() payload: unknown) {
    void this.handle(payload)
      .then(() => {
        Logger.log('Message processed successfully');
      })
      .catch((err: unknown) => {
        Logger.error('Error processing message:', err);
      });
    return;
  }

  async handle(@Payload() payload: unknown): Promise<void> {
    try {
      console.log(new Date().toLocaleTimeString(), 'Received message:');
      console.log(
        new Date().toLocaleTimeString(),
        'Producing message to topic:',
        process.env.PRODUCER_TOPIC,
      );
      await this.appService.produce(process.env.PRODUCER_TOPIC ?? '', payload);
      console.log(
        new Date().toLocaleTimeString(),
        'Produced message to topic:',
        process.env.PRODUCER_TOPIC,
      );
      return;
    } catch (err: unknown) {
      Logger.error('Error producing message:', err);
      return;
    }
  }
}
