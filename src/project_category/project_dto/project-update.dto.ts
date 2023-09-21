import { PartialType } from "@nestjs/mapped-types";
import { ProjectDto } from "./project.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ProjectUpdateDto extends PartialType(ProjectDto) {
    @IsNumber()
    public projectId: number;

    @IsNotEmpty()
    public projectImage: Express.Multer.File;
}