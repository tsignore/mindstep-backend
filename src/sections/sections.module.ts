import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionController } from './sections.controller';
import { SectionService } from './sections.service';
import { Section, SectionSchema } from './entities/section.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }])],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionsModule {}
