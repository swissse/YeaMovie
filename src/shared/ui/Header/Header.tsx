import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import s from './Header.module.css';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get('q');
  const g = searchParams.get('g');

  useEffect(() => {
    if (q) {
      setSearchValue(q);
    } else {
      setSearchValue('');
    }
  }, [q]);

  const handleSearch = () => {
    const value = searchValue.trim();
    if (!value) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className={s.header_container}>
      <a href="/">
        <h2 className={s.header_title}>YeaMovie</h2>
      </a>

      <div className={s.search_wrapp}>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={s.search_input}
          type="text"
          placeholder="Поиск..."
          disabled={!!g}
        />

        <button onClick={handleSearch} className={s.search_btn}>
          <img src="/search.svg" alt="" />
        </button>
      </div>

      {children}
    </header>
  );
}
