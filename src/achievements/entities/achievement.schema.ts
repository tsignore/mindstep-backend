import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Achievement {
  @Prop({ type: Object, required: true })
  title: { en: string; ru: string };

  @Prop({ type: Object, required: true })
  description: { en: string; ru: string };

  @Prop({ required: true })
  xpRequired: number;
}


export type AchievementDocument = Achievement & Document;
export const AchievementSchema = SchemaFactory.createForClass(Achievement);
