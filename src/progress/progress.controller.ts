import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('complete')
  async completeLesson(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('lessonId') lessonId: string,
  ) {
    return this.progressService.completeLesson(userId, courseId, lessonId);
  }

  @Get(':userId/:courseId')
  async getProgress(@Param('userId') userId: string, @Param('courseId') courseId: string) {
    return this.progressService.getUserProgress(userId, courseId);
  }
  
}
