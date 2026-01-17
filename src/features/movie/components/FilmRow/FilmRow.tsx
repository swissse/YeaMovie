import { useState } from 'react';
import SliderButtons from '../SliderButtons/SliderButtons';
import s from './FilmRow.module.css';
import { TitleRowRequestTrending, TitleRowRequestNew } from '../../../home/constants';
import { getTitleRowNew, getTitleRowTrending } from '../../../home/api/rest';
import type { Film } from '../../../../shared/Types';
import FilmCard from '../FilmCard/FilmCard';
import Loader from '../../../../shared/ui/Loader';
import { Link } from 'react-router';

interface FilmRowProps {
  type: string;
  typeContent: string;
  title: string;
}

export default function FilmRow({ type, typeContent, title }: FilmRowProps) {
  const [page, setPage] = useState<number>(1);
  const skeletons = Array(5).fill(null);

  const finalTitleRowTrendingRequest = { ...TitleRowRequestTrending, type, page };
  const finalTitleRowNewRequest = { ...TitleRowRequestNew, type, page };

  const { data, isLoading } =
    typeContent === 'trending'
      ? getTitleRowTrending(finalTitleRowTrendingRequest)
      : getTitleRowNew(finalTitleRowNewRequest);

  const apiData = data as {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  } | null;

  const films = apiData?.docs || [];

  return (
    <div className={s.film_row_wrapper}>
      <div className={s.title_btns_wrapp}>
        <h2 className={s.title}>{title}</h2>
        <SliderButtons type={'film'} setPage={setPage} page={page} />
      </div>

      <div className={s.title_row_container}>
        {isLoading
          ? skeletons.map((_, index) => {
              return (
                <div key={index} className={s.skeleton_card}>
                  <Loader
                    size={35}
                    color="#E50000"
                    cssOverride={{
                      position: 'absolute',
                      left: '42%',
                      top: '45%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              );
            })
          : films.map(film => {
              return (
                <Link to={`/movie/${film.id}`} key={film.id}>
                  <FilmCard type={type} typeContent={typeContent} filmData={film} />
                </Link>
              );
            })}
      </div>
    </div>
  );
}
