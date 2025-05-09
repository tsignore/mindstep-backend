import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.schema';


@Controller('leaderboard')
export class LeaderboardController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get()
  async getLeaderboard() {
    return this.userModel.find().sort({ xp: -1 }).limit(10).select('name xp level');
  }
}
