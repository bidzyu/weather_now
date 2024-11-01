import { Link } from 'react-router-dom';
import appStyle from '../../app.module.scss';
import style from './header.module.scss';
import logo from '../../assets/logo_1.png';

export const Header: React.FC = () => {
  return (
    <header>
      <div className={appStyle.container}>
        <Link className={style.logo} to="/">
          <img src={logo} alt="Название компании" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">Погода</Link>
            </li>
            <li>
              <Link to="/location">Местоположение</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
