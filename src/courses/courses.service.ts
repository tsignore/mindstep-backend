import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course, CourseDocument } from './entities/course.schema';
import { jwtDecode } from 'src/auth/jwt.decode';
import { Request } from 'express';


@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async createCourse(req: Request,dto: CreateCourseDto) {
    const token = req.cookies.access_token;
    const id = jwtDecode(token);
    return this.courseModel.create({...dto, creator: id});
  }


  async getCourses() {
    return this.courseModel.find().populate('creator');
  }

  async getCourseById(id: string) {
    return this.courseModel.findById(id).populate('creator');
  }

  async getCoursesByCreator(id: string) {
    return this.courseModel.find({creator:id})
  }
}
