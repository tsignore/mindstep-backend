import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Achievement, AchievementDocument } from './entities/achievement.schema';
import { User, UserDocument } from 'src/users/entities/user.schema';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Achievement.name) private achievementModel: Model<AchievementDocument>,
  ) {}

  async checkAchievements(userId: string) {
    const user = await this.userModel.findById(userId).populate('achievements');
    if (!user) {
        throw new Error('User not found');
      }
    const achievements = await this.achievementModel.find();

    for (const achievement of achievements) {
      const alreadyHasAchievement = user.achievements.some(
        // @ts-ignore
        (a) => a._id.toString() === (achievement._id as Types.ObjectId).toString(),
      );

      if (user.xp >= achievement.xpRequired && !alreadyHasAchievement) {
        // @ts-ignore
        user.achievements.push(achievement._id);
      }
    }

    await user.save();
  }
}
