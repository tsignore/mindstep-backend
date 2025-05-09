import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { jwtDecode } from 'src/auth/jwt.decode';
import { User } from './entities/user.schema';
import { Course } from 'src/courses/entities/course.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    
    if (existingUser) {
      throw new HttpException(
        {
          statusCode: 409,
          message: `User with email ${createUserDto.email} already exists`,
          error: 'Conflict',
          errors: [
            {
              field: 'email',
              message: `User with this email already exists, try another one`,
            },
          ],
        },
        HttpStatus.CONFLICT,
      );
    }
    
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(token: string): Promise<User[]> {
    const userId = jwtDecode(token);
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).populate('achievements').exec();
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async remove(token: string, id: string) {
    const userId = jwtDecode(token);
    await this.userModel.findByIdAndDelete(id);
    return { message: `Profile successfully deleted` };
  }

  async getCompletedCourses(userId: string): Promise<any[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('completedCourses')
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user.completedCourses;
  }
  
  async addCompletedCourse(userId: string, courseId: string): Promise<User> {
    const courseObjectId = new Types.ObjectId(courseId);
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.completedCourses.includes(courseObjectId)) {
      user.completedCourses.push(courseObjectId);
      await user.save();
    }

    return user;
  }
}