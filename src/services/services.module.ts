import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesApiController } from './services.api.controller';
import { BullModule } from '@nestjs/bull';
import { DockerRunServiceConsumer } from './queue.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'docker-run-service' })],
  controllers: [ServicesApiController],
  providers: [ServicesService, DockerRunServiceConsumer],
})
export class ServicesModule {}
