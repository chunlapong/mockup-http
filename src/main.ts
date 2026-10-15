import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomServerConfluentKafkaJS } from '@corp-ais/eqxjs-kafka-server-confluent-kafkajs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    strategy: new CustomServerConfluentKafkaJS(),
  });
  app.enableShutdownHooks();
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
