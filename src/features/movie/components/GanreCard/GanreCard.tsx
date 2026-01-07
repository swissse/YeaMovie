import type { Film } from '../../../../shared/Types';
import { getGanreRow } from '../../../home/api/rest';
import { GanreRowRequest } from '../../../home/constants';
import s from './GanreCard.module.css';

interface GanreCardProps {
  ganre: string;
  type: string;
  page: number;
}

export default function GanreCard({ ganre, type, page }: GanreCardProps) {
  const finalGanreRowRequest = { ...GanreRowRequest, page, type, ganre };

  const { data } = getGanreRow(finalGanreRowRequest);

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
      <div className={s.ganre_card}>
        <div className={s.ganre_img}>
          {films.map(img => {
            return <img className={s.ganre_poster} src={img.poster?.url} />;
          })}
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
