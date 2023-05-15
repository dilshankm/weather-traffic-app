import { getNearestLocation, getTraficLocation, getOptions } from './utils';

describe('getNearestLocation', () => {
  const locations = [
    { name: 'Location 1', latitude: 1.234, longitude: 2.345 },
    { name: 'Location 2', latitude: 3.456, longitude: 4.567 },
  ];

  it('should return the closest location', () => {
    const latitude = 1.123;
    const longitude = 2.234;
    const expectedLocation = {
      name: 'Location 1',
      latitude: 1.234,
      longitude: 2.345,
    };
    const closestLocation = getNearestLocation(latitude, longitude, locations);
    expect(closestLocation).toEqual(expectedLocation);
  });
});

describe('getTraficLocation', () => {
  const weatherForecast = {
    area_metadata: [
      {
        name: 'Location 1',
        label_location: { latitude: 1.234, longitude: 2.345 },
      },
      {
        name: 'Location 2',
        label_location: { latitude: 3.456, longitude: 4.567 },
      },
    ],
  };

  it('should return the matched location name', () => {
    const latitude = 1.234;
    const longitude = 2.345;
    const expectedLocation = 'Location 1';
    const matchedLocation = getTraficLocation(
      latitude,
      longitude,
      weatherForecast,
    );
    expect(matchedLocation).toEqual(expectedLocation);
  });
});

describe('getOptions', () => {
  const traficImages = {
    items: [
      {
        cameras: [
          {
            location: { latitude: 1.234, longitude: 2.345 },
          },
        ],
      },
    ],
  };

  const weatherForecast = {
    area_metadata: [
      {
        name: 'Location 1',
        label_location: { latitude: 1.234, longitude: 2.345 },
      },
      {
        name: 'Location 2',
        label_location: { latitude: 3.456, longitude: 4.567 },
      },
    ],
  };

  it('should return the options map', () => {
    const traficImages = {
      items: [
        {
          cameras: [
            {
              location: {
                latitude: 1.234,
                longitude: 2.345,
              },
            },
          ],
        },
      ],
    };
    const weatherForecast = {
      area_metadata: [],
    };
    const expectedOptions = new Map();
    expectedOptions.set('', [
      {
        location: {
          latitude: 1.234,
          longitude: 2.345,
        },
      },
    ]);
    const options = getOptions(traficImages, weatherForecast);
    expect(options).toEqual(expectedOptions);
  });
});
