import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Service, Prisma } from '@Prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ServicesService {
  constructor(
    @InjectQueue('docker-run-service') private dockerRunServiceQueue: Queue,
    private db: DatabaseService,
  ) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput,
  ): Promise<Service | null> {
    const service = await this.db.service.findUnique({
      where: serviceWhereUniqueInput,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return service;
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
    const service = await this.db.service.findUnique({
      where,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return this.db.service.update({
      data,
      where,
    });
  }

  async deleteService(
    where: Prisma.ServiceWhereUniqueInput,
  ): Promise<Service | any> {
    const service = await this.db.service.findUnique({
      where,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return this.db.service.delete({
      where,
    });
  }
}
