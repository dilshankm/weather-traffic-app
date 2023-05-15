import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ApisService } from './apis.service';
import * as mockTrafficImages from './mock-data/trafficImages.json';
import * as mockWeatherForecast from './mock-data/weatherForecast.json';


describe('ApisService', () => {
  let service: ApisService;
  let httpService: HttpService;
  let cacheManager;

  const mockCacheManager = {
    get: jest.fn().mockImplementation(() => null),
    set: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn().mockReturnValue(
      of({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApisService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<ApisService>(ApisService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getTrafficImages with the correct parameters and get data from API if cache is empty', async () => {
    const dateTime = '2023-01-01T00:00:00';
    const result = await service.getTrafficImages(dateTime);
    expect(cacheManager.get).toHaveBeenCalledWith(`traffic-images:${dateTime}`);
    expect(httpService.get).toHaveBeenCalledWith(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`);
    expect(cacheManager.set).toHaveBeenCalledWith(`traffic-images:${dateTime}`, {}, 0);
    expect(result).toEqual({});
  });

  it('should call getWeatherForecast with the correct parameters and get data from API if cache is empty', async () => {
    const dateTime = '2023-01-01T00:00:00';
    const result = await service.getWeatherForecast(dateTime);
    expect(cacheManager.get).toHaveBeenCalledWith(`weather-forecast:${dateTime}`);
    expect(httpService.get).toHaveBeenCalledWith(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateTime}`);
    expect(cacheManager.set).toHaveBeenCalledWith(`weather-forecast:${dateTime}`, {}, 0);
    expect(result).toEqual({});
  });

  it('should call getLocationMap with the correct parameters and get data from API if cache is empty', async () => {
    const dateTime = '2023-01-01T00:00:00';
    const mockWeatherForecast = require('../apis/mock-data/weatherForecast.json');
    const mockTrafficImages = require('../apis/mock-data/trafficImages.json');
    mockCacheManager.get.mockImplementation((key) => {
      switch (key) {
        case `weather-forecast:${dateTime}`:
          return mockWeatherForecast;
        case `traffic-images:${dateTime}`:
          return mockTrafficImages;
        default:
          return null;
      }
    });
    const result = await service.getLocationMap(dateTime);
    expect(cacheManager.get).toHaveBeenCalledWith(`location-map:${dateTime}`);
    expect(cacheManager.get).toHaveBeenCalledWith(`weather-forecast:${dateTime}`);
    expect(cacheManager.get).toHaveBeenCalledWith(`traffic-images:${dateTime}`);
    expect(httpService.get).not.toHaveBeenCalled();
  });
  

  

  
});
