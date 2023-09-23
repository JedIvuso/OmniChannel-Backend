import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProjectDto } from './project_dto/project.dto';
import { ProjectUpdateDto } from './project_dto/project-update.dto';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { readFile } from 'fs/promises';
import * as FormData from 'form-data';

@Injectable()
export class ProjectCategoryService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async createProject(projectImage: Express.Multer.File, dto: ProjectDto) {
    const { projectDescription, projectName } = dto;

    const existingProject = await this.prisma.eclProjects.findUnique({
      where: {
        projectName: projectName.toLowerCase(),
      },
    });

    if (existingProject) {
      throw new BadRequestException('ProjectName already exists');
    }

    await this.prisma.eclProjects.create({
      data: {
        projectDescription,
        projectImage: projectImage.filename,
        projectName,
      },
    });

    return {
      message: 'Project created successfully',
      respCode: '00',
    };
  }

  async listProjects() {
    const projects = await this.prisma.eclProjects.findMany();

    // const temp = projects.map((project) => ({
    //   ...project,
    // }));
    return {
      projects,
      message: 'All Projects',
      respCode: '00',
    };
  }

  async updateProject(dto: ProjectUpdateDto) {
    const { projectId, projectDescription, projectImage, projectName } = dto;

    const existingProject = await this.prisma.eclProjects.findUnique({
      where: {
        projectId,
      },
    });

    if (!existingProject) {
      throw new BadRequestException(
        `Project with the project id ${projectId} not found!`,
      );
    }

    await this.prisma.eclProjects.update({
      where: { projectId },
      data: {
        projectDescription,
        projectName,
        projectImage: projectImage.filename,
      },
    });

    return {
      message: 'Project updated successfully',
      respCode: '00',
    };
  }

  async deleteProject(payload: any) {
    const { projectId } = payload;

    await this.prisma.eclProjects.delete({
      where: {
        projectId,
      },
    });

    return {
      message: 'Project deleted successfully',
      respCode: '00',
    };
  }
}
