import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ApisService } from './apis.service';
import { HttpStatus } from '@nestjs/common';

@Controller('apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Get('traffic-images')
  async getTrafficImages(@Query('date_time') dateTime: string) {
    try {
      return await this.apisService.getTrafficImages(dateTime);
    } catch (error) {
      return { error: error };
    }
  }

  @Get('weather-forecast')
  async getWeatherForecast(@Query('date_time') dateTime: string) {
    try {
      return await this.apisService.getWeatherForecast(dateTime);
    } catch (error) {
      return { error: error };
    }
  }

  @Get('location-map')
  async getLocationMap(@Query('date_time') dateTime: string) {
    try {
      const locationMap = await this.apisService.getLocationMap(dateTime);
      return Object.fromEntries(locationMap);
    } catch (error) {
      return { error: error };
    }
  }
}
