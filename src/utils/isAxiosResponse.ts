export const isAxiosResponse = (resp: unknown) => {
  return (
    typeof resp === 'object' &&
    resp !== null &&
    'config' in resp &&
    'data' in resp
  );
};
