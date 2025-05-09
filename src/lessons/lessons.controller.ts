import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lessons.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }

  @Get('section/:sectionId')
  getLessonsBySection(@Param('sectionId') sectionId: string) {
    return this.lessonService.getLessonsBySection(sectionId);
  }

  @Get(':id')
  getLesson(@Param('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Get('/course/:courseId')
    async getLessonsByCourse(@Param('courseId') courseId: string) {
    return this.lessonService.getLessonsByCourse(courseId);
  }
}
