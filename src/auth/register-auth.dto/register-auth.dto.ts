import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterAuthDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 40, {
        message: 'Password must be between 8 and 40 characters',
      })
    public password: string;

    @IsNotEmpty()
    public employmentNumber: number;

    @IsNotEmpty()
    @IsString()
    public firstName: string;

    @IsNotEmpty()
    @IsString()
    public lastName: string;
}