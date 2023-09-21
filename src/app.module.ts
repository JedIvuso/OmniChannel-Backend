import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectCategoryModule } from './project_category/project_category.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, PrismaModule, ProjectCategoryModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
