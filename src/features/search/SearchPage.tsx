import { Link, useLocation } from 'react-router';
import Header from '../../shared/ui/Header/Header';
import s from './SearchPage.module.css';
import { useState } from 'react';
import { SearchValueRequest } from '../home/constants';
import { useSearchValue } from './hooks/useSearchValue';
import type { Film } from '../../shared/Types';
import FilmCard from '../movie/components/FilmCard/FilmCard';
import SliderButtons from '../movie/components/SliderButtons/SliderButtons';
import Loader from '../../shared/ui/Loader';

export default function SearchPage() {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  const finalRequest = query ? { ...SearchValueRequest, query, page } : null;
  const { data, isLoading } = useSearchValue(finalRequest ?? SearchValueRequest);

  const apiData = data as {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  } | null;

  const films = apiData?.docs || [];
  console.log(data, query, finalRequest);
  return (
    <>
      <Header />
      <div className={s.searchPage_container}>
        {!isLoading ? (
          films.map(film => {
            return (
              <Link to={`/movie/${film.id}`} key={film.id}>
                <FilmCard filmData={film} typeContent="search" />
              </Link>
            );
          })
        ) : (
          <Loader size={50} color="#E50000" />
        )}
        {!isLoading && (
          <SliderButtons setPage={setPage} page={page} type="search" lastPage={apiData?.pages} />
        )}
      </div>
    </>
  );
}
