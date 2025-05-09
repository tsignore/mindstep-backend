import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  order_num: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
