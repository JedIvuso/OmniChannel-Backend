import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProjectDto } from './project_dto/project.dto';
import { ProjectUpdateDto } from './project_dto/project-update.dto';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { readFile } from 'fs/promises';
import FormData from 'form-data';

@Injectable()
export class ProjectCategoryService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

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

    // Now, implement the image upload code similar to what you provided
    const formData = new FormData();
    formData.append('image', projectImage.buffer.toString('base64'));

    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Image upload failed: ${error.message}`);
          }),
        ),
    );

    // Once the image is uploaded, you can create the project with the image URL
    await this.prisma.eclProjects.create({
      data: {
        projectDescription,
        projectImage: imageData.data.url, // Use the uploaded image URL
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

    const formData = new FormData();
    formData.append('image', projectImage.buffer.toString('base64'));

    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Image upload failed: ${error.message}`);
          }),
        ),
    );

    await this.prisma.eclProjects.update({
      where: { projectId },
      data: {
        projectDescription,
        projectName,
        projectImage: imageData.data.url,
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
