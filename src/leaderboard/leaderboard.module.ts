import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderboardController } from './leaderboard.controller';
import { User, UserSchema } from 'src/users/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [LeaderboardController],
})
export class LeaderboardModule {}
