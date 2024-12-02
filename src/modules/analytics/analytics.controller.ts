import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('ad-info')
  getAdInfo(@Query('isPremium') isPremium: boolean, @Query('region') region: string) {
    return this.analyticsService.getAdInfo(isPremium, region);
  }}