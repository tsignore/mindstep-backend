import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Response() res, @Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(res, signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Response() res, @Body() registerDto: CreateUserDto) {
    return this.authService.signUp(res, registerDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req);
  }
}