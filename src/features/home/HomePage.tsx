import s from './HomePage.module.css';
import Header from '../../shared/ui/Header/Header';
import Banner from './components/Banner/Banner';
import GanreRow from '../movie/components/GanreRow/GanreRow';

export default function HomePage() {
  return (
    <div className={s.container}>
      <Header />
      <Banner />
      <div className={s.movie_container}>
        <GanreRow type={'movie'} />
      </div>
    </div>
  );
}
