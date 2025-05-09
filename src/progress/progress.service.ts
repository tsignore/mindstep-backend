import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './entities/progress.schema';
import { AchievementService } from 'src/achievements/achievement.service';
import { User, UserDocument } from 'src/users/entities/user.schema';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<ProgressDocument>, @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
  private readonly achievementService: AchievementService 
) {}

  async getUserProgress(userId: string, courseId: string) {
    return this.progressModel.findOne({ user: userId, course: courseId }).populate('completedLessons');
  }

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    const progress = await this.progressModel.findOneAndUpdate(
      { user: userId, course: courseId },
      { $addToSet: { completedLessons: lessonId } },
      { upsert: true, new: true }
    );
  
    if (progress) {
      await this.addXP(userId, 10);
    }
  
    return progress;
  }
  
  async completeCourse(userId: string, courseId: string) {
    await this.addXP(userId, 50);
  }

  async addXP(userId: string, amount: number) {
    const user = await this.userModel.findById(userId);
    if (!user) return;
  
    user.xp += amount;

    user.level = Math.floor(user.xp / 100) + 1;
  
    await user.save();

    await this.achievementService.checkAchievements(userId);
  }
}
