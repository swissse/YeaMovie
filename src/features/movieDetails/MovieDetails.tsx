import { useParams } from 'react-router';
import Loader from '../../shared/ui/Loader';
import s from './MovieDetails.module.css';
import { getMovieInfo } from './api/rest';
import { useEffect, useState } from 'react';
import Header from '../../shared/ui/Header/Header';

export default function MovieDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [LoadedCount, setLoadedCount] = useState(0);
  const [pagePersons, setPagePersons] = useState(0);
  const [pageFilm, setPageFilm] = useState(0);
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data, isLoading } = getMovieInfo(!Number.isNaN(movieId) ? movieId : undefined);

  useEffect(() => {
    setIsLoaded(false);
    setLoadedCount(0);
  }, [data?.id, pageFilm]);

  const persons = data?.persons.slice(pagePersons * 8, pagePersons * 8 + 8);
  const similarMovies = data?.similarMovies?.slice(pageFilm * 6, pageFilm * 6 + 6);

  return (
    <>
      <Header />

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
            key={data?.id}
            onError={() => setIsLoaded(true)}
            onLoad={() => setIsLoaded(true)}
            className={`${s.banner_img} ${isLoaded && s.block}`}
            src={data?.backdrop?.url}
            alt="preview работает только с VPN, так как картинки из зарубежного источника :("
          />

          <h2 className={s.banner_title}>{data?.name ?? data?.alternativeName}</h2>

          <p className={s.banner_description}>{data?.shortDescription}</p>

          <button className={s.banner_button}>
            <img src={'playFilm.svg'} alt="" />
            <span className={s.banner_button_text}>Смотреть</span>
          </button>
        </>
      </div>

      <div className={s.content_grid}>
        <div className={s.description_container}>
          <span className={s.title}>Описание</span>
          <p className={s.description_text}>{data?.description}</p>
        </div>

        <div className={s.persons_container}>
          <div className={s.title_btn}>
            <span className={s.title}>Актеры</span>
            <div className={s.btn_container}>
              <button
                onClick={() => {
                  setPagePersons(prev => (prev ? prev - 1 : prev));
                }}
              >
                <img src="/prev.svg" alt="" />
              </button>
              <button
                onClick={() => {
                  if (data?.persons && data?.persons.length > (pagePersons + 1) * 8)
                    setPagePersons(prev => prev + 1);
                }}
              >
                <img src="/next.svg" alt="" />
              </button>
            </div>
          </div>
          <div className={s.persons_row}>
            {persons?.map(person => {
              return <img key={person.id} src={person.photo} alt="" />;
            })}
          </div>
        </div>

        <div className={s.similarMovies_container}>
          <div className={s.title_btn}>
            <span className={s.title}>Похожие фильмы</span>
            <div className={s.btn_container}>
              <button
                onClick={() => {
                  setPageFilm(prev => (prev ? prev - 1 : prev));
                }}
              >
                <img src="/prev.svg" alt="" />
              </button>
              <button
                onClick={() => {
                  if (data?.similarMovies && data?.similarMovies.length > (pageFilm + 1) * 6)
                    setPageFilm(prev => prev + 1);
                }}
              >
                <img src="/next.svg" alt="" />
              </button>
            </div>
          </div>
          {data?.similarMovies?.length ? (
            <div className={s.similarMovies_row}>
              {LoadedCount !== similarMovies?.length && (
                <Loader
                  size={35}
                  color={'#E50000'}
                  cssOverride={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
              {similarMovies?.map(movie => {
                return (
                  <img
                    className={`${s.no_visibility} ${LoadedCount === similarMovies?.length && s.block}`}
                    onLoad={() => setLoadedCount(prev => prev + 1)}
                    key={movie.id}
                    src={movie.poster?.previewUrl}
                    alt=""
                  />
                );
              })}
            </div>
          ) : (
            <div className={s.no_film}>
              <img src="/sad.png" alt="" />
              <p className={s.no_film_text}>Нет похожих релизов</p>
            </div>
          )}
        </div>

        <div className={s.fullInfo}>
          <div className={s.ReleasedYear_container}>
            <div className={s.ReleasedYear_title}>
              <img src="/calendar.svg" alt="" />
              <span className={s.title}>Дата выхода</span>
            </div>
            <span className={s.ReleasedYear_date}>{data?.year}</span>
          </div>
          <div className={s.country_container}>
            <div className={s.country_title}>
              <img src="/language.svg" alt="" />
              <span className={s.title}>Страны</span>
            </div>
            <div className={s.country}>
              {data?.countries?.map(country => {
                return (
                  <span className={s.country_background} key={country.name}>
                    {country.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={s.rating_container}>
            <div className={s.rating_title}>
              <img src="/rating.svg" alt="" />
              <span className={s.title}>Рейтинг</span>
            </div>
            <div className={s.rating}>
              <span className={s.country_background}>
                IMDb: <strong className={s.rating_red}>{data?.rating.imdb}</strong>
              </span>
              <span className={s.country_background}>
                KP: <strong className={s.rating_red}>{data?.rating.kp}</strong>
              </span>
              <span className={s.country_background}>
                TMDb: <strong className={s.rating_red}>{data?.rating.tmdb ?? 0}</strong>
              </span>
            </div>
          </div>

          <div className={s.action_container}>
            <div className={s.action_title}>
              <img src="/action.svg" alt="" />
              <span className={s.title}>Жанры</span>
            </div>
            <div className={s.country}>
              {data?.genres?.map(ganre => {
                return (
                  <span className={s.country_background} key={ganre.name}>
                    {ganre.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader size={50} color="#E50000" />}
    </>
  );
}
