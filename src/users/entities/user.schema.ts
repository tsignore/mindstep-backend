import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../enums/role.enum';


@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.STUDENT })
  role: Role;

  @Prop({ default: 0 })
  xp: number;

  @Prop({ default: 1 })
  level: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Achievement' }] })
achievements: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  completedCourses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

