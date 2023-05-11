import { getNearestLocation, setDateTime } from '.';

describe('getNearestLocation', () => {
  it('returns the closest location from the given latitude and longitude', () => {
    const locations = [
      { name: 'Location A', latitude: 1, longitude: 1 },
      { name: 'Location B', latitude: 2, longitude: 2 },
      { name: 'Location C', latitude: 3, longitude: 3 },
    ];
    const latitude = 1.5;
    const longitude = 1.5;
    const result = getNearestLocation(latitude, longitude, locations);
    expect(result).toEqual(locations[1]);
  });
});

describe('setDateTime', () => {
  it('returns the correct date and time', () => {
    const date = '2023-05-10';
    const time = {
      $H: 11, 
      $m: 11   
    };
    const result = setDateTime(date, time);
    expect(result.format('YYYY-MM-DD[T]HH:mm:ss')).toEqual('2023-05-10T11:11:00');
  });

  it('returns null if either date or time is not provided', () => {
    const date = '2023-05-10';
    const time = null;
    const result = setDateTime(date, time);
    expect(result).toBeNull();
  });
});
