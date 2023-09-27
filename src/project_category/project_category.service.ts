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

  async createChannel(channelImage: Express.Multer.File, dto: ProjectDto) {
    const { channelDescription, channelTitle } = dto;

    const channelProject = await this.prisma.eclChannels.findUnique({
      where: {
        channelTitle: channelTitle.toLowerCase(),
      },
    });

    if (channelProject) {
      throw new BadRequestException('channelTitle already exists');
    }

    await this.prisma.eclChannels.create({
      data: {
        channelDescription,
        channelImage: channelImage.filename,
        channelTitle,
      },
    });

    return {
      message: 'Channel created successfully',
      respCode: '00',
    };
  }

  async listChannels() {
    const channels = await this.prisma.eclChannels.findMany();

    // const temp = channels.map((project) => ({
    //   ...channels,
    // }));
    return {
      channels,
      message: 'All Channels',
      respCode: '00',
    };
  }

  async updateChannel(dto: ProjectUpdateDto) {
    const { channelId, channelDescription, channelImage, channelTitle } = dto;

    const existingChannel = await this.prisma.eclChannels.findUnique({
      where: {
        channelId,
      },
    });

    if (!existingChannel) {
      throw new BadRequestException(
        `Channel with the channel id ${channelId} not found!`,
      );
    }

    await this.prisma.eclChannels.update({
      where: { channelId },
      data: {
        channelDescription,
        channelTitle,
        channelImage: channelImage.filename,
      },
    });

    return {
      message: 'Channel updated successfully',
      respCode: '00',
    };
  }

  async deleteChannel(payload: any) {
    const { channelId } = payload;

    await this.prisma.eclChannels.delete({
      where: {
        channelId,
      },
    });

    return {
      message: 'Channel deleted successfully',
      respCode: '00',
    };
  }
}
