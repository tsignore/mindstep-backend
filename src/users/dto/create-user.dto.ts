import { IsEmail, IsEnum, Length } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @Length(2, 50, { message: 'Invalid name length' })
  name: string;

  @IsEmail(undefined, { message: 'It is not email' })
  email: string;

  @Length(8, undefined, { message: 'Password length must be greater than 8' })
  password: string;

  @IsEnum(Role)
  role: Role;
}