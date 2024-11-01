import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/stateTypes';
import { checkScroll } from '../../utils/checkScroll';
import { getBodyScrollbarWidth } from '../../utils/getBodyScrollbarWidth';
import './scroll.scss';

export const ScrollChecker: React.FC = () => {
  const location = useLocation();
  const data = useSelector((state: RootState) => state.weatherDataReducer);

  const setScroll = () => {
    const hasScroll = checkScroll();

    if (hasScroll) {
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
    } else {
      if (!document.body.classList.contains('no-scroll')) {
        document.body.classList.add('no-scroll');
      }
    }
  };

  const setScrollSizeProp = (size: number) => {
    document.body.style.setProperty('--scroll-size', size + 'px');
  };

  useEffect(() => {
    setScroll();
  }, [data, location]);

  useEffect(() => {
    const scroll = getBodyScrollbarWidth();
    setScrollSizeProp(scroll);

    window.addEventListener('resize', setScroll);

    // Убираем обработчик события при размонтировании
    return () => {
      window.removeEventListener('resize', setScroll);
    };
  }, []);

  return null;
};
