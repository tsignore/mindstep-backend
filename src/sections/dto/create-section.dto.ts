import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  course: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  // @IsNumber()
  // order_num: number;
}
