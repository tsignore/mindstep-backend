import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard)
  @Post()
  createPurchase(@Body() dto: CreatePurchaseDto ) {
    return this.purchaseService.createPurchase(dto);
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  getUserPurchases(@Param('userId') userId: string) {
    return this.purchaseService.getUserPurchases(userId);
  }
}
