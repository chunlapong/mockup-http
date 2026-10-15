import {
  CustomServerConfluentKafkaJS,
  Producer,
} from '@corp-ais/eqxjs-kafka-server-confluent-kafkajs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RecordMetadata } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class AppService implements OnModuleInit {
  private producer!: Producer;
  constructor() {}

  onModuleInit(): void {
    this.producer = CustomServerConfluentKafkaJS.getProducer();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async produce(topic: string, payload: unknown): Promise<RecordMetadata[]> {
    return await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}
