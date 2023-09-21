import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProjectDto {
    @IsString()
    @IsNotEmpty()
    public projectName: string;

    // @IsNumber()
    // public projectId: number;

    // @IsNotEmpty()
    // public projectImage: Express.Multer.File;

    @IsString()
    @IsNotEmpty()
    public projectDescription: string;
}