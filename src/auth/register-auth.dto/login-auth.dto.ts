import { RegisterAuthDto } from "./register-auth.dto";
import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {

  @Exclude()
  public employmentNumber: number;

  @Exclude()
  public firstName: string;

  @Exclude()
  public lastName: string;
}
