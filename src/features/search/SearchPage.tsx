import { Link, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import Header from '../../shared/ui/Header/Header';
import s from './SearchPage.module.css';
import { ganres, SearchValueRequest } from '../home/constants';
import { useSearch } from './hooks/useSearchValue';
import type { Film } from '../../shared/Types';
import FilmCard from '../movie/components/FilmCard/FilmCard';
import SliderButtons from '../movie/components/SliderButtons/SliderButtons';
import Loader from '../../shared/ui/Loader';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('q') ?? '';
  const ganreValue = searchParams.get('g') ?? '';
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [querySearch, ganreValue]);

  const { data, isLoading } = useSearch({
    page,
    limit: SearchValueRequest.limit,
    query: querySearch || undefined,
    genre: ganreValue || undefined,
  });

  const apiData = data as {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  } | null;

  const films = apiData?.docs || [];

  return (
    <>
      <Header>
        <select
          className={s.select}
          value={ganreValue}
          onChange={e => {
            const value = e.target.value;

            setSearchParams(value ? { g: value } : {});
          }}
        >
          <option value="">По названию</option>
          {ganres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </Header>

      <div className={s.searchPage_container}>
        {isLoading && <Loader size={50} color="#E50000" />}

        {films.map(film => (
          <Link to={`/movie/${film.id}`} key={film.id}>
            <FilmCard filmData={film} typeContent="search" />
          </Link>
        ))}

        {!isLoading && !films.length && data && (
          <div className={s.no__result}>
            <img src="sad.png" alt="" />
            <p>Нет результатов</p>
          </div>
        )}

        {!isLoading && apiData && apiData.pages > 1 && (
          <SliderButtons setPage={setPage} page={page} type="search" lastPage={apiData?.pages} />
        )}
      </div>
    </>
  );
}
