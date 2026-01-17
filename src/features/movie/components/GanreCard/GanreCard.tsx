import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { Film } from '../../../../shared/Types';
import { getGanreRow } from '../../../home/api/rest';
import { GanreRowRequest } from '../../../home/constants';
import s from './GanreCard.module.css';
import Loader from '../../../../shared/ui/Loader';

interface GanreCardProps {
  ganre: string;
  type: string;
  page: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function GanreCard({ ganre, type, page, setIsLoading }: GanreCardProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [page]);

  const finalGanreRowRequest = { ...GanreRowRequest, type, ganre };

  const { data, isLoading } = getGanreRow(finalGanreRowRequest);
  setIsLoading(isLoading);

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
      <div className={`${s.ganre_card} ${!isLoading && s.block}`}>
        <div className={s.ganre_img}>
          {films.map(img => {
            return (
              <img
                key={img.id}
                onLoad={() => setIsLoaded(true)}
                className={`${s.ganre_poster} ${isLoaded && s.visible}`}
                src={img.poster?.url}
              />
            );
          })}
          {!isLoaded && (
            <Loader
              cssOverride={{
                position: 'absolute',
                display: 'flex',
                justifySelf: 'center',
                alignSelf: 'center',
              }}
              size={50}
              color="#E50000"
            />
          )}
        </div>
        <div className={s.ganre_link}>
          <span className={s.ganre_name}>{ganre}</span>
          <button className={s.ganre_btn}>
            <img src="next.svg" alt="" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className={s.ganre_card}>
          <Loader size={50} color="#E50000" />
        </div>
      )}
    </>
  );
}
