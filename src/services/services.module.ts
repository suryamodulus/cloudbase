import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { BullModule } from '@nestjs/bull';
import { DockerRunServiceConsumer } from './queue.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'docker-run-service' })],
  controllers: [ServicesController],
  providers: [ServicesService, DockerRunServiceConsumer],
})
export class ServicesModule {}
