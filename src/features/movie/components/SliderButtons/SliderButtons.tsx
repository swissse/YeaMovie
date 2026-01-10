import { type Dispatch, type SetStateAction } from 'react';
import s from './SliderButtons.module.css';
import type { Film } from '../../../../shared/Types';

interface SliderButtonsProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  type: string;
}

export default function SliderButtons({ setPage, page, type }: SliderButtonsProps) {
  const films = Array(type === 'film' ? 4 : 2).fill(' ');
  console.log(page);

  function handleNextPage() {
    if (type === 'search') return setPage(prev => prev + 1);
    setPage(prev => (prev === films.length ? 1 : prev + 1));
  }

  function handlePrevPage() {
    if (type === 'search') return setPage(prev => (prev > 1 ? prev - 1 : prev));
    setPage(prev => (prev === 1 ? films.length : prev - 1));
  }

  return (
    <div className={s.slider_btns}>
      <button className={s.btn_change} onClick={handlePrevPage}>
        <img src="prev.svg" />
      </button>
      <div className={s.slider_btns_status}>
        {type === 'search' ? (
          <div className={s.status_number}>
            {page > 1 && (
              <span
                onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
                className={s.number}
              >
                {page - 1}
              </span>
            )}
            <span className={s.active_number}>{page}</span>
            <span onClick={() => setPage(prev => prev + 1)} className={s.number}>
              {page + 1}
            </span>
            <span onClick={() => setPage(prev => prev + 2)} className={s.number}>
              {page + 2}
            </span>
            <span onClick={() => setPage(prev => prev + 5)} className={s.number}>
              {page + 5}
            </span>
          </div>
        ) : (
          films.map((film: Film, index: number) => {
            return (
              <span
                key={film.id}
                className={`${s.default_status} ${page === index + 1 ? s.active : ''}`}
                onClick={() => setPage(index + 1)}
              ></span>
            );
          })
        )}
      </div>
      <button className={s.btn_change} onClick={handleNextPage}>
        <img src="next.svg" />
      </button>
    </div>
  );
}
