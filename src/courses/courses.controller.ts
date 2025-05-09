import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';


@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(req, dto);
    
  }

  @Get()
  getAll() {
    return this.courseService.getCourses();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Get('user/:id')
  getByCreator(@Param('id') id: string) {
    return this.courseService.getCoursesByCreator(id);
  }
}
