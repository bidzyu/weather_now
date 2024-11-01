import style from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.gooey}>
      <span className={style.dot}></span>
      <div className={style.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
