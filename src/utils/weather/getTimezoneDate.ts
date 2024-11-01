export const getTimezoneDate = (timezone: number): string => {
  const hours = Math.floor(timezone / 3600);
  const minutes = Math.floor((timezone % 3600) / 60);

  const date = new Date();

  date.setHours(date.getUTCHours() + hours);
  date.setMinutes(date.getUTCMinutes() + minutes);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return date.toLocaleString('ru-RU', options);
};
