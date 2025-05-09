import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  category: string;

  @IsString()
  creator: string;

  @IsString()
  imageUrl: string;
}
