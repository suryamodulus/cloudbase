import {
  HttpCode,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Service, Prisma } from '@Prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as Docker from 'dockerode';

const docker = new Docker();

@Injectable()
export class ServicesService {
  constructor(
    @InjectQueue('docker-run-service') private dockerRunServiceQueue: Queue,
    private db: DatabaseService,
  ) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput,
  ): Promise<Service | null> {
    return this.db.service.findUnique({
      where: serviceWhereUniqueInput,
      include: {
        envVariables: true,
        project: true,
      },
    });
  }

  async services(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ServiceWhereInput;
  }): Promise<Service[]> {
    const { skip, take, where } = params;
    return this.db.service.findMany({
      skip,
      take,
      where,
      include: {
        envVariables: true,
        project: true,
      },
    });
  }

  async createService(
    data: Prisma.ServiceUncheckedCreateInput,
  ): Promise<Service> {
    const service = await this.db.service.create({
      data,
    });
    await this.dockerRunServiceQueue.add({
      serviceId: service.id,
    });
    return service;
  }

  async updateService(params: {
    where: Prisma.ServiceWhereUniqueInput;
    data: Prisma.ServiceUncheckedUpdateInput;
  }): Promise<Service> {
    const { where, data } = params;
    return this.db.service.update({
      data,
      where,
    });
  }

  async deleteService(
    where: Prisma.ServiceWhereUniqueInput,
  ): Promise<Service | any> {
    await this.deleteContainer(where.id);
    return this.db.service.delete({
      where,
    });
  }

  async restartService(where: Prisma.ServiceWhereUniqueInput): Promise<void> {
    const { id } = where;
    const container = await docker.getContainer(id);
    if (!container) {
      throw new HttpException('Container not found', 400);
    }
    container.restart(id);
  }

  async deleteContainer(id: string): Promise<void> {
    const container = await docker.getContainer(id);
    if (!container) {
      throw new HttpException('Container not found', 400);
    }
    await container.remove({ v: true, force: true, link: false });
  }
}
