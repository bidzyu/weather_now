import '../components/ScrollChecker/scroll.scss';

export const getBodyScrollbarWidth = (): number => {
  const outer = document.createElement('div');
  outer.classList.add('scroll');
  const inner = document.createElement('div');

  outer.style.visibility = 'hidden'; // Скрываем элемент
  outer.style.overflow = 'scroll'; // Включаем скроллинг
  outer.style.width = '100px'; // Фиксированная ширина

  inner.style.width = '100%'; // Ширина внутреннего элемента 100%

  // Добавляем внутренний элемент во внешний
  outer.appendChild(inner);
  // Добавляем внешний элемент в body
  document.body.appendChild(outer);

  // Вычисляем ширину скроллбара
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Удаляем временные элементы
  document.body.removeChild(outer);

  return scrollbarWidth;
};
