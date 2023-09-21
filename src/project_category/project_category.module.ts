import { Module } from '@nestjs/common';
import { ProjectCategoryController } from './project_category.controller';
import { ProjectCategoryService } from './project_category.service';
import { PrismaModule } from 'prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, HttpModule, MulterModule.register({ dest: './images'})],
  providers: [ProjectCategoryService],
  controllers: [ProjectCategoryController],
})
export class ProjectCategoryModule {}
