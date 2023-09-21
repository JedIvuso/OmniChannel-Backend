import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectCategoryService } from './project_category.service';
import { ProjectDto } from './project_dto/project.dto';
import { ProjectUpdateDto } from './project_dto/project-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategory: ProjectCategoryService) {}

//   @Post('create-project-category')
//   createProject(@Body() dto: ProjectDto) {
//     return this.projectCategory.createProject(dto);
//   }

@Post('create-project-category')
  @UseInterceptors(
    FileInterceptor('projectImage', {
      limits: {
        fileSize: 1024 * 1024 * 4, // Max file size (4 MB in this example)
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
          return callback(new Error('Only image files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createProject(@UploadedFile() projectImage: Express.Multer.File, @Body() dto: ProjectDto) {
    return this.projectCategory.createProject(projectImage, dto)
  }

  @Patch('update-project')
  updateProject(@Body() dto: ProjectUpdateDto) {
    return this.projectCategory.updateProject(dto);
  }

  @Post('delete-project')
  deleteProject(@Body() payload: any) {
    return this.projectCategory.deleteProject(payload);
  }

  @Get('list-projects')
  listProjects() {
    return this.projectCategory.listProjects();
  }
}
