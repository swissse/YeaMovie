import { useState } from 'react';
import { ganre } from '../../../home/constants';
import s from './GanreRow.module.css';
import SliderButtons from '../SliderButtons/SliderButtons';
import GanreCard from '../GanreCard/GanreCard';

interface GanreRowProps {
  type: string;
}

export default function GanreRow({ type }: GanreRowProps) {
  const [page, setPage] = useState<number>(1);

  return (
    <div className={s.ganre_row_wrapper}>
      <>
        <div className={s.title_btns_wrapp}>
          <h2 className={s.title}>Жанры</h2>
          <SliderButtons />
        </div>

        <div className={s.ganre_row_container}>
          {ganre.map(ganre => {
            return <GanreCard ganre={ganre} type={type} page={page} />;
          })}
        </div>
      </>
    </div>
  );
}
