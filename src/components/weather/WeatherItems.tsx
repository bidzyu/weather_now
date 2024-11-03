import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherItem } from './WeatherItem';
import { RootState } from '../../redux/stateTypes';
import {
  setCoordinates,
  setSelectedIndex,
  setTimezone,
} from '../../redux/slices/weather/weatherDataSlice';
import { getWeatherIcon } from '../../utils/weather/weatherIcons';
import style from './weatherItems.module.scss';

export const WeatherItems: React.FC<{ scrollToSelected: () => void }> = ({
  scrollToSelected,
}) => {
  const { citiesFullData, selectedIndex, timezone, loading } = useSelector(
    (state: RootState) => state.weatherDataReducer
  );

  const dispatch = useDispatch();

  const cityClickHandler = (lat: number, lon: number) => {
    dispatch(setCoordinates([lat, lon]));
  };

  React.useEffect(() => {
    const tz = citiesFullData[selectedIndex]?.timezone;

    if (tz === null) return;

    dispatch(setTimezone(tz));

    return () => {
      if (timezone === null) return;

      dispatch(setTimezone(null));
    };
  }, [citiesFullData]);

  if (loading) return null;

  return (
    <section>
      <ul className={style.items}>
        {citiesFullData.map((data, index) => {
          const { sym } = getWeatherIcon(data.weather[0].icon);

          return (
            <WeatherItem
              key={index}
              sym={sym}
              data={data}
              selected={selectedIndex === index}
              selectHandler={(x, y) => {
                cityClickHandler(x, y);
                dispatch(setSelectedIndex(index));
                dispatch(setTimezone(data.timezone));
                scrollToSelected();
              }}
            />
          );
        })}
      </ul>
    </section>
  );
};
