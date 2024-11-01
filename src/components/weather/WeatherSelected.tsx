import React from 'react';
import { useSelector } from 'react-redux';
import { MapComponent } from './Map/MapComponent';
import { WeatherCurrTime } from './WeatherCurrTime';
import { getWeatherIcon, getWindDirection, convertFromHPA } from '../../utils';
import { RootState } from '../../redux/stateTypes';
import classNames from 'classnames';
import style from './weatherSelected.module.scss';
import { Loader } from '../Loader';
import { Coordinates } from '../../redux/slices/weather/types';

export const WeatherSelected = React.forwardRef<HTMLElement>((_, ref) => {
  const { citiesFullData, selectedIndex, loading, timezone } =
    useSelector((state: RootState) => state.weatherDataReducer);

  const data = citiesFullData[selectedIndex];

  if (!data) return null;
  if (loading) return <Loader />;

  const newCoords: Coordinates = [data.coord.lat, data.coord.lon];

  const { sym, weather, meridiem } = getWeatherIcon(data.weather[0].icon);
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);

  return (
    <section ref={ref}>
      <div
        className={classNames(
          style.selected,
          meridiem === 'День' ? style.day : style.night
        )}
      >
        <MapComponent coordinates={newCoords} center={newCoords} />
        <div className={style.info}>
          {timezone !== null && <WeatherCurrTime timezone={timezone} />}
          <p>
            {meridiem} <span className={style.icon}>{sym}</span> {weather}
          </p>
          <h2>
            <span>{temp >= 0 ? `+${temp}` : temp}</span> °C
          </h2>
          <p>
            Ощущается как:{' '}
            <span>{feelsLike >= 0 ? `+${feelsLike}` : feelsLike}</span> °C
          </p>

          <ul className={style.detail}>
            <li>
              <h4>Влажность</h4>
              <p>
                {data.main.humidity}
                <span> %</span>
              </p>
            </li>
            <li>
              <h4>Ветер</h4>
              <p>
                {data.wind.speed}
                <span> м/с</span>
                <br />
                <span>{getWindDirection(data.wind.deg)}</span>
              </p>
            </li>
            <li>
              <h4>Давление</h4>
              <p>
                {convertFromHPA(data.main.pressure)}
                <span> мм рт. ст.</span>
              </p>
            </li>
            <li>
              <h4>Облачность</h4>
              <p>
                {data.clouds.all}
                <span> %</span>
              </p>
            </li>
            <li>
              <h4>Видимость</h4>
              <p>
                {(data.visibility / 1000).toFixed(1)}
                <span> км</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
});
