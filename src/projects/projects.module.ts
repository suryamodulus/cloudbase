import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsApiController } from './projects.api.controller';
import { ProjectsWebController } from './projects.web.controller';

@Module({
  controllers: [ProjectsApiController, ProjectsWebController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
