import { useEffect, useState } from 'react';
import s from './Header.module.css';
import { useNavigate, useSearchParams } from 'react-router';

export default function Header() {
  const [searchValue, setSearchValue] = useState<any>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchValue(q);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className={s.header_container}>
      <a href="/">
        <h2 className={s.header_title}>YeaMovie</h2>
      </a>
      <div className={s.search_wrapp}>
        <input
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
          value={searchValue}
          className={s.search_input}
          type="text"
          placeholder="Поиск..."
        />
        <button onClick={() => handleSearch()} className={s.search_btn}>
          <img src="/search.svg" alt="" />
        </button>
      </div>
    </header>
  );
}
