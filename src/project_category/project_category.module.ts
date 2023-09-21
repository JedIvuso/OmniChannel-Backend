import { Module } from '@nestjs/common';
import { ProjectCategoryController } from './project_category.controller';
import { ProjectCategoryService } from './project_category.service';
import { PrismaModule } from 'prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ProjectCategoryService],
  controllers: [ProjectCategoryController],
})
export class ProjectCategoryModule {}
