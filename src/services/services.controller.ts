import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ListQueryDefaultDTO } from 'src/common/dto/list-query.dto';
import { ServiceStatusEnum } from 'src/projects/constants';

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
  findOne(@Param('id') id: string) {
    return this.servicesService.service({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.updateService({
      where: { id },
      data: updateServiceDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.deleteService({ id });
  }
}
