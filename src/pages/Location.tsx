import { useSelector } from 'react-redux';
import style from '../app.module.scss';
import CopyText from '../components/CopyText';
import { RootState } from '../redux/stateTypes';

export const Location = () => {
  const { ip, geo } = useSelector((state: RootState) => state.geoReducer);
  console.log(ip, geo);

  if (!ip || !geo)
    return (
      <main className={style.center}>
        <div className={style.container}>
          <div className={style.horCenter}>Данные не получены...</div>
        </div>
      </main>
    );

  return (
    <main className={style.center}>
      <div className={style.container}>
        <div className={style.horCenter}>
          <div>
            Город(en): <CopyText text={geo.city} />
          </div>
          <div>
            Ваш IP адрес: <CopyText text={ip} />
          </div>
          <div>Координаты:</div>
          <div>
            Широта(lat): <CopyText text={String(geo.lat)} />
          </div>
          <div>
            Долгота(lon): <CopyText text={String(geo.lon)} />
          </div>
        </div>
      </div>
    </main>
  );
};
