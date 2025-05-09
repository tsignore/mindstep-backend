import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  section: string;

  @IsString()
  course: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];
}
