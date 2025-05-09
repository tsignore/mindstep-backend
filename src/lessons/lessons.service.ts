import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './entities/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';


@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>) {}

  async createLesson(dto: CreateLessonDto): Promise<Lesson> {
    const lessonsInSection = await this.lessonModel
      .find({ section: dto.section })
      .sort({ order_num: 1 })
      .exec();

    const newOrderNum = lessonsInSection.length > 0 ? lessonsInSection[lessonsInSection.length - 1].order_num + 1 : 1;

    return this.lessonModel.create({ ...dto, order_num: newOrderNum });
  }
  

  async getLessonsBySection(sectionId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ section: sectionId }).sort({ order_num: 1 }).exec();
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    return this.lessonModel.findById(id).exec();
  }

  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ course: courseId }).sort({ order_num: 1 }).exec();
  }
}
