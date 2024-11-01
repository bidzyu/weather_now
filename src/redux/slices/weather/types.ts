export type Coordinates = [number, number];

export type TimerId = ReturnType<typeof setTimeout>;

export interface CitiesResponse {
  list: CitiesData[];
}

export interface CitiesData {
  id: number; // ID города
  name: string; // Название города
  coord: {
    lat: number; // Широта
    lon: number; // Долгота
  };
  main: {
    temp: number; // Температура
    feels_like: number; // Ощущается как
    temp_min: number; // Минимальная температура
    temp_max: number; // Максимальная температура
    pressure: number; // Давление
    humidity: number; // Влажность
    sea_level?: number; // Уровень моря (опционально)
    grnd_level?: number; // Уровень грунта (опционально)
  };
  dt: number; // Время получения данных (Unix timestamp)
  wind: {
    speed: number; // Скорость ветра
    deg: number; // Направление ветра
  };
  sys: {
    country: string; // Код страны
  };
  rain?: {
    [key: string]: number; // Объект с данными о дожде (опционально)
  } | null; // Может быть null
  snow?: {
    [key: string]: number; // Объект с данными о снеге (опционально)
  } | null; // Может быть null
  clouds: {
    all: number; // Процент облачности
  };
  weather: {
    id: number; // ID состояния погоды
    main: string; // Основное состояние
    description: string; // Описание состояния погоды
    icon: string; // Иконка состояния погоды
  }[];
}

export interface CitiesFullData {
  coord: {
    lon: number; // Долгота
    lat: number; // Широта
  };
  weather: {
    id: number; // ID состояния погоды
    main: string; // Основное состояние
    description: string; // Описание состояния погоды
    icon: string; // Иконка состояния погоды
  }[];
  base: string; // Базовая информация о метеорологических станциях
  main: {
    temp: number; // Температура
    feels_like: number; // Ощущается как
    temp_min: number; // Минимальная температура
    temp_max: number; // Максимальная температура
    pressure: number; // Давление
    humidity: number; // Влажность
    sea_level?: number; // Уровень моря (опционально)
    grnd_level?: number; // Уровень грунта (опционально)
  };
  visibility: number; // Видимость
  wind: {
    speed: number; // Скорость ветра
    deg: number; // Направление ветра
    gust?: number; // Порыв ветра (опционально)
  };
  clouds: {
    all: number; // Процент облачности
  };
  dt: number; // Время получения данных (Unix timestamp)
  sys: {
    type: number; // Тип системы
    id: number; // ID системы
    country: string; // Код страны
    sunrise: number; // Время восхода (Unix timestamp)
    sunset: number; // Время заката (Unix timestamp)
  };
  timezone: number; // Часовой пояс
  id: number; // ID города
  name: string; // Название города
  cod: number; // Код ответа
}
