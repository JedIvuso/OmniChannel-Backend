import { PartialType } from "@nestjs/mapped-types";
import { ProjectDto } from "./project.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ProjectUpdateDto extends PartialType(ProjectDto) {
    @IsNumber()
    public channelId: number;

    @IsNotEmpty()
    public channelImage: Express.Multer.File;
}