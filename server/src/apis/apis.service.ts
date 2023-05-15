import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { getTraficLocation, getOptions } from './utils';

@Injectable()
export class ApisService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getTrafficImages(dateTime: string) {
    const cacheKey = `traffic-images:${dateTime}`;
    let data = await this.cacheManager.get(cacheKey);
    if (!data) {
      try {
        const response = await this.httpService
          .get(
            `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`,
          )
          .toPromise();
        data = response.data;
        await this.cacheManager.set(cacheKey, data, 0);
      } catch (error) {
        return error;
      }
    }
    return data;
  }

  async getWeatherForecast(dateTime: string) {
    const cacheKey = `weather-forecast:${dateTime}`;
    let data = await this.cacheManager.get(cacheKey);
    if (!data) {
      try {
        const response = await this.httpService
          .get(
            `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateTime}`,
          )
          .toPromise();
        data = response.data;
        await this.cacheManager.set(cacheKey, data, 0);
      } catch (error) {
        return error;
      }
    }
    return data;
  }

  async getLocationMap(dateTime: string) {
    const cacheKey = `location-map:${dateTime}`;
    let data = await this.cacheManager.get(cacheKey);
    if (!data) {
      try {
        let weatherForecast = await this.cacheManager.get(
          `weather-forecast:${dateTime}`,
        );
        if (!weatherForecast) {
          weatherForecast = await this.getWeatherForecast(dateTime);
        }
        let traficImages = await this.cacheManager.get(
          `traffic-images:${dateTime}`,
        );
        if (!traficImages) {
          traficImages = await this.getTrafficImages(dateTime);
        }
        data = getOptions(traficImages, weatherForecast);
        await this.cacheManager.set(cacheKey, data, 0);
      } catch (error) {
        return error;
      }
    }
    return data;
  }
}
