import { useState } from 'react';
import s from './SliderButtons.module.css';
import type { Film } from '../../../../shared/Types';

export default function SliderButtons() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const films = Array(4).fill(' ');

  return (
    <div className={s.slider_btns}>
      <button
        className={s.btn_change}
        onClick={() => setCurrentIndex(prev => (prev - 1 + films.length) % films.length)}
      >
        <img src="prev.svg" />
      </button>
      <div className={s.slider_btns_status}>
        {films.map((film: Film, index: number) => {
          return (
            <span
              key={film.id}
              className={`${s.default_status} ${currentIndex === index ? s.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          );
        })}
      </div>
      <button
        className={s.btn_change}
        onClick={() => setCurrentIndex(prev => (prev + 1) % films.length)}
      >
        <img src="next.svg" />
      </button>
    </div>
  );
}
