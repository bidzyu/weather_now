export const filterCollisions = (list: any[]) => {
  return list.reduce(
    (resObj, city) => {
      if (resObj.ids.includes(city.id)) {
        return resObj;
      }

      resObj.res.push(city);
      resObj.ids.push(city.id);

      return resObj;
    },
    {
      res: [],
      ids: [],
    }
  ).res;
};
