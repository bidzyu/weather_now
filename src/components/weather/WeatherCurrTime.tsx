import { useEffect, useState } from 'react';
import { getTimezoneDate } from '../../utils/weather/getTimezoneDate';

export const WeatherCurrTime: React.FC<{ timezone: number }> = ({
  timezone,
}) => {
  const [currentDate, setCurrentDate] = useState(getTimezoneDate(timezone));

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(getTimezoneDate(timezone));
    }, 200);

    return () => clearInterval(timerId);
  }, [timezone]);

  return <div>{currentDate}</div>;
};
