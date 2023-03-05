import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ListQueryDefaultDTO } from 'src/common/dto/list-query.dto';
import { BasicAuthGaurd } from 'src/auth/auth-basic.guard';

@UseGuards(BasicAuthGaurd)
@Controller('services')
export class ServicesWebController {
  constructor(private readonly servicesService: ServicesService) {}

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
}
