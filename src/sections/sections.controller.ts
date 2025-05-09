import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SectionService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() dto: CreateSectionDto) {
    return this.sectionService.createSection(dto);
  }

  @Get(':courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.sectionService.getSectionsByCourse(courseId);
  }
}
