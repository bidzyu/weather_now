import React from 'react';
import style from '../app.module.scss';
import {
  WeatherSelected,
  WeatherItems,
  WeatherInput,
} from '../components/weather';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/stateTypes';
import {
  fetchCitiesData,
  fetchCitiesFullData,
} from '../redux/slices/weather/weatherDataSlice';
import { useAppDispatch } from '../redux/store';
import { setLastRequestCityName } from '../redux/slices/weather/weatherGeoSlice';

export const Weather: React.FC = React.memo(() => {
  const { cityName, lastRequestCityName } = useSelector(
    (state: RootState) => state.weatherGeoReducer
  );

  const dispatch = useAppDispatch();

  const selectedRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!cityName || cityName === lastRequestCityName) return;

    (async () => {
      const citiesList = await dispatch(fetchCitiesData(cityName)).unwrap();

      if (citiesList.length) {
        await dispatch(fetchCitiesFullData(citiesList)).unwrap();
      }

      dispatch(setLastRequestCityName(cityName));
    })();
  }, [cityName]);

  const scrollToSelected = () => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div className={style.container}>
        <WeatherInput />
        <WeatherSelected ref={selectedRef} />
        <WeatherItems scrollToSelected={scrollToSelected} />
      </div>
    </main>
  );
});
