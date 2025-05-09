import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './entities/purchase.schema';
import { Course, CourseDocument } from 'src/courses/entities/course.schema';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createPurchase(dto: CreatePurchaseDto): Promise<Purchase> {
    const course = await this.courseModel.findById(dto.course);
    if (!course) {
      throw new NotFoundException('Курс не найден');
    }

    const existingPurchase = await this.purchaseModel.findOne({
      user: dto.user,
      course: dto.course,
    });

    if (existingPurchase) {
      throw new BadRequestException('Вы уже приобрели этот курс');
    }

    return this.purchaseModel.create(dto);
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    
    return this.purchaseModel.find({ user: userId }).populate({
      path: 'course',
      populate: {
        path: 'creator',
        model: 'User'
      },
    }).exec();
  }
}
