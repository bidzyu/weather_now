export const sortCitiesById = (weatherList: any[]) => {
  return weatherList.slice().sort((a: any, b: any) => a.id - b.id);
};
