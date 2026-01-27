import { useEffect, useState } from 'react';
import type { Film } from '../../../../shared/Types';
import formatDuration from '../../../../shared/utils/FormatDuration';
import s from './FilmCard.module.css';
import Loader from '../../../../shared/ui/Loader';

interface FilmCardProps {
  filmData: Film;
  typeContent: string;
  type?: string;
}

export default function FilmCard({ filmData, typeContent, type }: FilmCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!filmData.poster?.previewUrl) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [filmData.id]);

  const resultInfo = () => {
    if (type === 'tv-series') {
      return (
        <div className={s.film_info}>
          {filmData.genres.slice(0, 1).map(ganre => (
            <span className={s.film_duration}>
              <img src={'ganre.svg'} alt="" />
              {ganre.name}
            </span>
          ))}
          <span className={s.film_rating}>
            <img src="rating.svg" />
            {filmData.rating.imdb}
          </span>
        </div>
      );
    }

    switch (typeContent) {
      case 'trending':
        return (
          <div className={s.film_info}>
            <span className={s.film_duration}>
              <img src={'clock.svg'} />
              {formatDuration(filmData.movieLength)}
            </span>
            <span className={s.film_rating}>
              <img src="rating.svg" />
              {filmData.rating.imdb}
            </span>
          </div>
        );
      case 'new':
        return (
          <div className={s.film_info}>
            <span className={s.film_year}>Вышел в {filmData.year}</span>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div className={`${typeContent === 'search' && s.card_wrapper}`}>
      <div className={`${typeContent === 'search' ? s.search_card : s.film_card}`}>
        <div className={s.poster_wrapper}>
          {!isLoaded && (
            <Loader
              size={35}
              color="#E50000"
              cssOverride={{
                position: 'absolute',
                left: '42%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
          {typeContent === 'search' ? (
            <>
              {!filmData.poster?.previewUrl ? (
                <div className={s.drop}>
                  <img src="sad.png" />
                  <div className={s.drop_name}>Нет постера</div>
                </div>
              ) : (
                <img
                  onLoad={() => setIsLoaded(true)}
                  className={`${s.film_img} ${isLoaded && s.visibility}`}
                  src={filmData.poster?.previewUrl}
                  alt=""
                />
              )}

              {<span className={s.img_rating}>{filmData.rating.imdb}</span>}
            </>
          ) : (
            <>
              {!filmData.poster?.previewUrl ? (
                <img src="sad.png" />
              ) : (
                <img
                  onLoad={() => setIsLoaded(true)}
                  className={`${s.film_img} ${isLoaded && s.visibility}`}
                  src={filmData.poster?.previewUrl}
                  alt=""
                />
              )}
            </>
          )}
        </div>

        {resultInfo()}
      </div>
      {typeContent === 'search' && <div className={s.film_name}>{filmData.name}</div>}
    </div>
  );
}
