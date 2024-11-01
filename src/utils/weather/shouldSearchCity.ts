export const shouldSearchCity = (city: string): boolean => {
  return city.trim().length >= 3;
};
