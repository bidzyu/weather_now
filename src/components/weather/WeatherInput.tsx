import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCoordinates,
  setSelectedIndex,
} from '../../redux/slices/weather/weatherDataSlice';
import {
  setCityName,
  setFRFalse,
} from '../../redux/slices/weather/weatherGeoSlice';
import { RootState } from '../../redux/stateTypes';
import { TimerId } from '../../redux/slices/weather/types';
import { shouldSearchCity } from '../../utils';
import style from './weatherInput.module.scss';

export const WeatherInput: React.FC = React.memo(() => {
  const { error, citiesFullData } = useSelector(
    (state: RootState) => state.weatherDataReducer
  );
  const geo = useSelector((state: RootState) => state.geoReducer.geo);
  const { isFirstRender, cityName } = useSelector(
    (state: RootState) => state.weatherGeoReducer
  );

  const dispatch = useDispatch();

  const [timer, setTimer] = React.useState<TimerId | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(cityName || '');

  React.useEffect(() => {
    if (isFirstRender && geo && geo.city !== inputValue) {
      setInputValue(geo.city);
    }
  }, [geo]);

  React.useEffect(() => {
    if (isFirstRender && geo) {
      const index = citiesFullData.findIndex((city) => {
        if (
          (Math.round(city.coord.lat) === Math.round(geo.lat) &&
            Math.round(city.coord.lon) === Math.round(geo.lon)) ||
          (Math.floor(city.coord.lat) === Math.floor(geo.lat) &&
            Math.floor(city.coord.lon) === Math.floor(geo.lon))
        ) {
          return true;
        }

        return false;
      });
      dispatch(setFRFalse());
      dispatch(setSelectedIndex(index === -1 ? 0 : index));
      dispatch(setCoordinates([geo.lat, geo.lon]));
    }
  }, [citiesFullData]);

  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (shouldSearchCity(inputValue) && cityName !== inputValue.trim()) {
      const newTimer = setTimeout(() => {
        const newCityName = inputValue.trim();

        dispatch(setCityName(newCityName));
      }, 1000);
      setTimer(newTimer);
    }
  }, [inputValue]);

  return (
    <section>
      {shouldSearchCity(cityName) ? (
        <h1 className={style.title}>
          Погода сейчас в городах с названием {cityName}
        </h1>
      ) : (
        <h1 className={style.title}>
          Введите название города чтобы узнать погоду
        </h1>
      )}
      <div className={style.searchContainer}>
        <input
          className={style.search}
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          placeholder="Введите название города"
        />
        {inputValue ? (
          isFocused && (
            <div onClick={() => setInputValue('')} className={style.close}>
              ✕
            </div>
          )
        ) : (
          <div className={style.searchIcon}>⌕</div>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{String(error)}</p>}
    </section>
  );
});
