import style from '../app.module.scss';

export const NotFound = () => {
  return (
    <main className={style.center}>
      <div className={style.container}>
        <div className={style.horCenter}>Not Found 404</div>
      </div>
    </main>
  );
};
