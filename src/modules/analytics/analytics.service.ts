import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  /**
   * Fetches advertisement information based on the seller's premium status.
   * @param isPremium - The premium status of the seller.
   * @param region - The region where the car is being sold.
   * @returns An object containing advertisement information or a message for non-premium sellers.
   */
  getAdInfo(isPremium: boolean, region: string) {
    if (!isPremium) {
      return { message: 'The platform does not provide information for non-premium sellers.' };
    }

    // Mock data for demonstration purposes
    const adInfo = {
      views: 1000,
      viewsPerDay: 100,
      viewsPerWeek: 700,
      viewsPerMonth: 3000,
      averagePriceInRegion: this.getAveragePriceInRegion(region),
      averagePriceInUkraine: this.getAveragePriceInUkraine(),
    };

    return adInfo;
  }

  /**
   * Fetches the average price of cars in the specified region.
   * @param region - The region where the car is being sold.
   * @returns The average price of cars in the region.
   */
  private getAveragePriceInRegion(region: string): number {
    // Mock implementation
    const regionPrices = {
      'Kyiv': 15000,
      'Lviv': 14000,
      'Odesa': 13000,
    };
    return regionPrices[region] || 12000;
  }

  /**
   * Fetches the average price of cars in Ukraine.
   * @returns The average price of cars in Ukraine.
   */
  private getAveragePriceInUkraine(): number {
    // Mock implementation
    return 13500;
  }
}