import { useMemo, useState } from 'react';
import { ganre } from '../../../home/constants';
import s from './GanreRow.module.css';
import SliderButtons from '../SliderButtons/SliderButtons';
import GanreCard from '../GanreCard/GanreCard';
import Loader from '../../../../shared/ui/Loader';

interface GanreRowProps {
  type: string;
}

export default function GanreRow({ type }: GanreRowProps) {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonsCard = Array(5).fill(null);

  const ganrePage = useMemo(() => {
    return ganre.slice((page - 1) * 5, page * 5);
  }, [page]);

  return (
    <div className={s.ganre_row_wrapper}>
      <>
        <div className={s.title_btns_wrapp}>
          <h2 className={s.title}>Жанры</h2>
          <SliderButtons setPage={setPage} page={page} />
        </div>

        <div className={s.ganre_row_container}>
          {isLoading &&
            skeletonsCard.map((_, index) => {
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
            })}
          {ganrePage.map(ganre => {
            return <GanreCard setIsLoading={setIsLoading} ganre={ganre} type={type} page={page} />;
          })}
        </div>
      </>
    </div>
  );
}
