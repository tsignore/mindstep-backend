import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './entities/section.schema';
import { CreateSectionDto } from './dto/create-section.dto';


@Injectable()
export class SectionService {
  constructor(@InjectModel(Section.name) private sectionModel: Model<SectionDocument>) {}

  async createSection(dto: CreateSectionDto): Promise<Section> {
    const maxOrderNum = await this.sectionModel
      .findOne({ course: dto.course })
      .sort({ order_num: -1 })
      .select('order_num')
      .exec();
  
    const newOrderNum = maxOrderNum ? maxOrderNum.order_num + 1 : 1;
  
    return this.sectionModel.create({ ...dto, order_num: newOrderNum });
    // const section = new this.sectionModel(dto);
    // return section.save();
  }

  async getSectionsByCourse(courseId: string): Promise<Section[]> {
    return this.sectionModel.find({ course: courseId }).exec();
  }
}
