import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Processor('docker-run-service')
export class DockerRunServiceConsumer {
  @Process()
  async runService(job: Job<unknown>) {
    console.log(job.data);
  }
}
