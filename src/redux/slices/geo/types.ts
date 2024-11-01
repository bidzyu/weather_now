export interface IpResponse {
  ip: string;
}

export interface GeoResponse {
  status: string; // Статус запроса (например, "success" или "fail")
  query: string; // IP-адрес, который был запрошен
  city: string; // Город
  region: string; // Код региона
  regionName: string; // Полное название региона
  country: string; // Страна
  countryCode: string; // Код страны (например, "US" для США)
  zip: string; // Почтовый индекс
  lat: number; // Широта
  lon: number; // Долгота
  isp: string; // Провайдер интернет-услуг
  org: string; // Организация
  as: string; // AS номер
}
