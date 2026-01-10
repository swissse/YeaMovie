import { useLocation } from 'react-router';
import Header from '../../shared/ui/Header/Header';
import s from './SearchPage.module.css';
import { useState } from 'react';
import { SearchValueRequest } from '../home/constants';
import { useSearchValue } from './hooks/useSearchValue';
import type { Film } from '../../shared/Types';
import FilmCard from '../movie/components/FilmCard/FilmCard';
import SliderButtons from '../movie/components/SliderButtons/SliderButtons';

export default function SearchPage() {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  const finalRequest = query ? { ...SearchValueRequest, query: query } : null;
  const { data } = useSearchValue(finalRequest ?? SearchValueRequest);

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
        {films.map(film => {
          return <FilmCard filmData={film} typeContent="search" />;
        })}

        <SliderButtons setPage={setPage} page={page} type="search" />
      </div>
    </>
  );
}
