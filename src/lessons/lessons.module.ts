import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonController } from './lessons.controller';
import { LessonService } from './lessons.service';
import { Lesson, LessonSchema } from './entities/lesson.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonsModule {}
