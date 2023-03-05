import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Project, Prisma } from '@Prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private db: DatabaseService) {}

  async project(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    const project = await this.db.project.findUnique({
      where: projectWhereUniqueInput,
    });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async projects(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.db.project.create({
      data,
    });
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    const project = await this.db.project.findUnique({
      where,
    });
    if (!project) {
      throw new NotFoundException();
    }
    return this.db.project.update({
      data,
      where,
    });
  }

  async deleteProject(
    where: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | any> {
    const project = await this.db.project.findUnique({
      where,
    });
    if (!project) {
      throw new NotFoundException();
    }
    return this.db.project.delete({
      where,
    });
  }
}
