import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { Film } from '../../../../shared/Types';
import { getGanreRow } from '../../../home/api/rest';
import { GanreRowRequest } from '../../../home/constants';
import s from './GanreCard.module.css';
import Loader from '../../../../shared/ui/Loader';
import { useNavigate } from 'react-router';

interface GanreCardProps {
  ganre: string;
  type: string;
  page: number;
  onLoaded: any;
}

export default function GanreCard({ ganre, type, page, onLoaded }: GanreCardProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);
  }, [page]);

  const finalGanreRowRequest = { ...GanreRowRequest, type, ganre };

  const { data, isLoading } = getGanreRow(finalGanreRowRequest);

  const apiData = data as {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  } | null;

  const handleGanreSearch = () => {
    navigate(`/search?g=${encodeURIComponent(ganre.trim())}`);
  };

  const films = apiData?.docs || [];
  return (
    <>
      <div onClick={() => handleGanreSearch()} className={`${s.ganre_card}`}>
        <div className={s.ganre_img}>
          {films.map(img => {
            return (
              <img
                key={img.id}
                onLoad={() => {
                  setIsLoaded(true);
                  onLoaded();
                }}
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
    </>
  );
}
