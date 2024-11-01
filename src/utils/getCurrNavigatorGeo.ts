import { Coordinates } from '../redux/slices/weather/types';

export const getCurrNavigatorGeo = () => {
  let geoCoords: Coordinates = [0, 0];

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        geoCoords = [latitude, longitude];
      },
      (error) => {
        console.error('Ошибка получения геолокации: ', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.log('Геолокация не поддерживается этим браузером.');
  }

  return geoCoords;
};
