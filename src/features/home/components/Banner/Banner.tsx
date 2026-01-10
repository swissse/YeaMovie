import { useEffect, useState } from 'react';
import s from './Banner.module.css';
import { getBannerInfo } from '../../api/rest';
import Loader from '../../../../shared/ui/Loader';

interface Film {
  id: number;
  alternativeName: string;
  name: string;
  shortDescription: string;
  backdrop?: {
    url: string;
    previewUrl: string;
  };
}

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { data, isLoading } = getBannerInfo();

  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  const apiData = data as {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  } | null;

  const films = apiData?.docs || [];
  const currentFilm = apiData?.docs[currentIndex];

  return (
    <>
      <div className={s.banner_container}>
        <>
          {!isLoaded && (
            <Loader
              cssOverride={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              size={50}
              color="#E50000"
            />
          )}

          <img
            key={currentFilm?.id}
            onLoad={() => setIsLoaded(true)}
            className={`${s.banner_img} ${isLoaded && s.block}`}
            src={currentFilm?.backdrop?.url}
            alt="preview работает только с VPN, так как картинки из зарубежного источника ):"
          />

          <h2 className={s.banner_title}>{currentFilm?.name ?? currentFilm?.alternativeName}</h2>

          <p className={s.banner_description}>{currentFilm?.shortDescription}</p>

          <button className={s.banner_button}>
            <img src={'playFilm.svg'} alt="" />
            <span className={s.banner_button_text}>Смотреть</span>
          </button>
        </>

        {films.length > 1 && (
          <div className={s.banner_slider_btns}>
            <button
              className={s.btn_change}
              onClick={() => setCurrentIndex(prev => (prev - 1 + films.length) % films.length)}
            >
              <img src="prev.svg" />
            </button>
            <div className={s.banner_slider_btns_status}>
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
        )}
      </div>
      {isLoading && <Loader size={50} color="#E50000" />}
    </>
  );
}
