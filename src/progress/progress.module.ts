import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Progress, ProgressSchema } from './entities/progress.schema';
import { UserModule } from 'src/users/user.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]), UserModule, AchievementsModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
