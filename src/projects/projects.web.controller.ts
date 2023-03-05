import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ListQueryDefaultDTO } from 'src/common/dto/list-query.dto';
import { BasicAuthGaurd } from 'src/auth/auth-basic.guard';

@UseGuards(BasicAuthGaurd)
@Controller('projects')
export class ProjectsWebController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() listQueryDefaultDTO: ListQueryDefaultDTO) {
    const projects = await this.projectsService.projects({
      ...listQueryDefaultDTO,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {}
}
