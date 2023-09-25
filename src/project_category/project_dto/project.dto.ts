import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProjectDto {
    @IsString()
    @IsNotEmpty()
    public channelTitle: string;

    // @IsNumber()
    // public projectId: number;

    // @IsNotEmpty()
    // public projectImage: Express.Multer.File;

    @IsString()
    @IsNotEmpty()
    public channelDescription: string;
}