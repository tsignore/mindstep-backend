import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/entities/user.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 0.0 })
  price: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop()
  imageUrl: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
