import React from 'react';
import { TimerId } from '../../redux/slices/weather/types';

interface CopyTextProps {
  text: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text }) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [tooltipText, setToolTipText] = React.useState('Скопировать в буфер');
  const [timer, setTimer] = React.useState<TimerId | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setToolTipText('Сохранено!');

      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(() => setToolTipText('Скопировать в буфер'), 1000));
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  };

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        textDecoration: 'underline',
        position: 'relative',
      }}
      onClick={handleCopy}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {text}
      {tooltipVisible && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#00193a',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            zIndex: 1,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default CopyText;
