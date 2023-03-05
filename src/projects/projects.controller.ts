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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ListQueryDefaultDTO } from 'src/common/dto/list-query.dto';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  findAll(@Query() listQueryDefaultDTO: ListQueryDefaultDTO) {
    return this.projectsService.projects({
      ...listQueryDefaultDTO,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.project({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject({
      where: { id },
      data: updateProjectDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.deleteProject({ id });
  }
}
