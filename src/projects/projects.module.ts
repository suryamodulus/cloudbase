import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsApiController } from './projects.api.controller';

@Module({
  controllers: [ProjectsApiController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
