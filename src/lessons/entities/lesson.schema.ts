import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  @Prop({ type: Types.ObjectId, ref: 'Section', required: true })
  section: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string; 

  @Prop()
  videoUrl: string;

  @Prop()
  course: string;

  @Prop({ type: [String] })
  materials: string[];

  @Prop()
  order_num: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
