import s from './HomePage.module.css';
import Header from '../../shared/ui/Header/Header';
import Banner from './components/Banner/Banner';
import GanreRow from '../movie/components/GanreRow/GanreRow';
import FilmRow from '../movie/components/FilmRow/FilmRow';

export default function HomePage() {
  return (
    <div className={s.container}>
      <Header />
      <Banner />
      <div className={s.movie_container}>
        <GanreRow type={'movie'} />
        <FilmRow title={'Популярные Фильмы'} type={'movie'} typeContent={'trending'} />
        <FilmRow title={'Новые Фильмы'} type={'movie'} typeContent={'new'} />
      </div>
      <div className={s.movie_container}>
        <GanreRow type={'tv-series'} />
        <FilmRow title={'Популярные Сериалы'} type={'tv-series'} typeContent={'trending'} />
        <FilmRow title={'Новые Сериалы'} type={'tv-series'} typeContent={'new'} />
      </div>
    </div>
  );
}
