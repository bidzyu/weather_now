import { CitiesFullData } from '../../redux/slices/weather/types';
import classNames from 'classnames';
import style from './weatherItems.module.scss';

interface WeatherItemProps {
  sym: string;
  data: CitiesFullData;
  selected: boolean;
  selectHandler: (x: number, y: number) => void;
}

export const WeatherItem: React.FC<WeatherItemProps> = ({
  sym,
  data,
  selected,
  selectHandler,
}) => {
  const temp = Math.round(data.main.temp);

  return (
    <li
      className={classNames(selected ? style.selected : null)}
      onClick={() => selectHandler(data.coord.lat, data.coord.lon)}
    >
      <span>{sym}</span>
      <div>
        {data.name}, {data.sys.country}
      </div>
      <div>{Math.round(data.wind.speed)} м/с</div>
      <div>{temp >= 0 ? `+${temp}` : temp} °C</div>
    </li>
  );
};
