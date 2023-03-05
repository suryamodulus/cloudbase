import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as Docker from 'dockerode';
import { ServiceStatusEnum } from 'src/services/constants';
import { ServicesService } from './services.service';

const docker = new Docker();
@Processor('docker-run-service')
export class DockerRunServiceConsumer {
  constructor(private servicesSerice: ServicesService) {}
  @Process()
  async runService(job: Job<any>) {
    const { serviceId } = job.data;
    // TODO: fix below type
    const service: any = await this.servicesSerice.service({
      id: serviceId,
    });
    try {
      await this.pullDockerImage(`${service.image}:${service.tag}`);
      const container = await docker.createContainer({
        name: serviceId,
        Image: `${service.image}:${service.tag}`,
        Env: service.envVariables.map(
          (envObj) => `${envObj.key}=${envObj.value}`,
        ),
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        OpenStdin: false,
        StdinOnce: false,
      });
      await container.start();
      await this.servicesSerice.updateService({
        where: { id: service.id },
        data: { status: ServiceStatusEnum.RUNNING },
      });
    } catch (err) {
      await this.servicesSerice.updateService({
        where: { id: service.id },
        data: { status: ServiceStatusEnum.ERRORED, errorLog: err },
      });
    }
  }

  async pullDockerImage(repoTag) {
    return new Promise((resolve, reject) => {
      docker.pull(repoTag, function (err, stream) {
        if (err) {
          reject(err);
        }
        docker.modem.followProgress(stream, onFinished);
        function onFinished(err, output) {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      });
    });
  }
}
