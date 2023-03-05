import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ListQueryDefaultDTO } from 'src/common/dto/list-query.dto';
import { ServiceStatusEnum } from 'src/services/constants';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    const { envVariables, ...rest } = createServiceDto;
    return this.servicesService.createService({
      ...rest,
      status: ServiceStatusEnum.QUEUED,
      envVariables: { create: envVariables },
    });
  }

  @Get()
  findAll(@Query() listQueryDefaultDTO: ListQueryDefaultDTO) {
    return this.servicesService.services({
      ...listQueryDefaultDTO,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.servicesService.service({ id });
    if (!service) {
      throw new NotFoundException();
    }
    return service;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const service = await this.servicesService.service({
      id,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return this.servicesService.updateService({
      where: { id },
      data: updateServiceDto,
    });
  }

  @Post(':id/restart')
  async restartContainer(@Param('id') id: string) {
    const service = await this.servicesService.service({
      id,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return this.servicesService.restartService({ id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const service = await this.servicesService.service({
      id,
    });
    if (!service) {
      throw new NotFoundException();
    }
    return this.servicesService.deleteService({ id });
  }
}
