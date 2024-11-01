import React from 'react';
import { fetchGeo, fetchIp } from '../../../redux/slices/geo/geoSlice';
import { useAppDispatch } from '../../../redux/store';

export const GeoLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      const ip = await dispatch(fetchIp()).unwrap();

      if (ip) {
        await dispatch(fetchGeo(ip)).unwrap();
      }
    })();
  }, []);

  return null;
};
