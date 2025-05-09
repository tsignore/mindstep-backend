import { Controller, Post, Body, Get, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { jwtDecode } from 'src/auth/jwt.decode';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.userService.findAll(req.cookies.access_token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.userService.remove(req.cookies.access_token, id);
  }

  @UseGuards(AuthGuard)
  @Get('completed-courses')
  async getCompletedCourses(@Request() req) {
    return this.userService.getCompletedCourses(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('completed-courses')
  async addCompletedCourse(@Request() req, @Body() body: { courseId: string }) {
  const token = req.cookies.access_token;
  const userId = jwtDecode(token);
  const { courseId } = body;
    return this.userService.addCompletedCourse(userId, courseId);
  }
}