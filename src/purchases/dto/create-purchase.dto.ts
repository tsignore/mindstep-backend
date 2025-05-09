import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  course: string;
}
