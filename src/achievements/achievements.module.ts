import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementService } from './achievement.service';
import { Achievement, AchievementSchema } from './entities/achievement.schema';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Achievement.name, schema: AchievementSchema }]), UserModule
  ],
  providers: [AchievementService],
  exports: [AchievementService]
})
export class AchievementsModule {}
