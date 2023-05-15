import { Test, TestingModule } from '@nestjs/testing';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as mockTrafficImages from './mock-data/trafficImages.json';
import * as mockWeatherForecast from './mock-data/weatherForecast.json';

describe('ApisController', () => {
  let controller: ApisController;
  let service: ApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApisController],
      providers: [ApisService],
      imports: [HttpModule, CacheModule.register()],
    }).compile();
    controller = module.get<ApisController>(ApisController);
    service = module.get<ApisService>(ApisService);
  });

  describe('getTrafficImages', () => {
    it('should return traffic images', async () => {
      const dateTime = '2023-05-11T00:10:00';
      const expectedResult = require('../apis/mock-data/trafficImages.json');
      jest.spyOn(service, 'getTrafficImages').mockResolvedValue(expectedResult);
      const result = await controller.getTrafficImages(dateTime);
      expect(result).toBe(expectedResult);
    });

    it('should handle errors and return error object', async () => {
      const dateTime = '2023-05-11T00:10:00';
      const error = new Error('Something went wrong');
      jest.spyOn(service, 'getTrafficImages').mockRejectedValue(error);
      const result = await controller.getTrafficImages(dateTime);
      expect(result).toEqual({ error: error });
    });
  });

  describe('getWeatherForecast', () => {
    it('should return weather forecast', async () => {
      const dateTime = '2023-05-11T00:10:00';
      const expectedResult = require('../apis/mock-data/weatherForecast.json');
      jest
        .spyOn(service, 'getWeatherForecast')
        .mockResolvedValue(expectedResult);
      const result = await controller.getWeatherForecast(dateTime);
      expect(result).toBe(expectedResult);
    });

    it('should handle errors and return error object', async () => {
      const dateTime = '2023-05-11T00:10:00';
      const error = new Error('Something went wrong');
      jest.spyOn(service, 'getWeatherForecast').mockRejectedValue(error);
      const result = await controller.getWeatherForecast(dateTime);
      expect(result).toEqual({ error: error });
    });
  });

  describe('getLocationMap', () => {
    it('should return location map', async () => {
      const map = new Map();
      const locationName = 'Bukit Panjang';
      const locationMap = [
        {
          timestamp: '2023-05-11T00:02:54+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2023/05/97de1d57-b200-4c9d-98b0-d0e49a922c1d.jpg',
          location: {},
          camera_id: '2703',
          image_metadata: {},
        },
      ];
      map.set(locationName, locationMap);
      const dateTime = '2023-01-01T00:00:00';
      jest.spyOn(service, 'getLocationMap').mockResolvedValue(locationMap);
      const result = await controller.getLocationMap(dateTime);
      expect(service.getLocationMap).toHaveBeenCalledWith(dateTime);
    });

    it('should handle errors and return error object', async () => {
      const dateTime = '2023-01-01T00:00:00';
      const error = new Error('Something went wrong');
      jest.spyOn(service, 'getLocationMap').mockRejectedValue(error);
      const result = await controller.getLocationMap(dateTime);
      expect(service.getLocationMap).toHaveBeenCalledWith(dateTime);
    });
  });
});
