import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './entities/purchase.schema';
import { Course, CourseSchema } from 'src/courses/entities/course.schema';
import { PurchaseController } from './purchases.controller';
import { PurchaseService } from './purchases.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Purchase.name, schema: PurchaseSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchasesModule {}
