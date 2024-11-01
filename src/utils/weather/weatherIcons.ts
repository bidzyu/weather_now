interface WeatherIconsType {
  [key: string]: WeatherItem;
}

interface WeatherItem {
  sym: string;
  weather: string;
  meridiem: string;
}

export const weatherIcons: WeatherIconsType = {
  '01d': { sym: '☀️', weather: 'Ясно', meridiem: 'День' },
  '01n': { sym: '🌙', weather: 'Ясно', meridiem: 'Ночь' },
  '02d': { sym: '🌤️', weather: 'Частично облачно', meridiem: 'День' },
  '02n': { sym: '🌥️', weather: 'Частично облачно', meridiem: 'Ночь' },
  '03d': { sym: '☁️', weather: 'Облачно', meridiem: 'День' },
  '03n': { sym: '☁️', weather: 'Облачно', meridiem: 'Ночь' },
  '04d': {
    sym: '☁️',
    weather: 'Облачно с большим количеством облаков',
    meridiem: 'День',
  },
  '04n': {
    sym: '☁️',
    weather: 'Облачно с большим количеством облаков',
    meridiem: 'Ночь',
  },
  '09d': { sym: '🌧️', weather: 'Дождь', meridiem: 'День' },
  '09n': { sym: '🌧️', weather: 'Дождь', meridiem: 'Ночь' },
  '10d': { sym: '🌦️', weather: 'Дождь с прояснениями', meridiem: 'День' },
  '10n': { sym: '🌧️', weather: 'Дождь с прояснениями', meridiem: 'Ночь' },
  '11d': { sym: '⛈️', weather: 'Гроза', meridiem: 'День' },
  '11n': { sym: '⛈️', weather: 'Гроза', meridiem: 'Ночь' },
  '13d': { sym: '❄️', weather: 'Снег', meridiem: 'День' },
  '13n': { sym: '❄️', weather: 'Снег', meridiem: 'Ночь' },
  '50d': { sym: '🌫️', weather: 'Туман', meridiem: 'День' },
  '50n': { sym: '🌫️', weather: 'Туман', meridiem: 'Ночь' },
};

export const getWeatherIcon = (code: string): WeatherItem => {
  return (
    weatherIcons[code] || {
      sym: '❓',
      weather: 'Неизвестно',
      meridiem: 'Неизвестно',
    }
  );
};
