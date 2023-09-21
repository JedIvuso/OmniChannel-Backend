import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectCategoryService } from './project_category.service';
import { ProjectDto } from './project_dto/project.dto';
import { ProjectUpdateDto } from './project_dto/project-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


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
        fileSize: 1024 * 1024 * 4,
      },
      storage: diskStorage({
        destination: "./images",
        filename: (req, file, cb) => {
            const name = file.originalname.split(".")[0];
            const fileExtension = file.originalname.split(".")[1];
            const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;

            cb(null, newFileName);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
          return callback(new Error('please upload JPEG,JPG,PNG file extension'), false);
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
