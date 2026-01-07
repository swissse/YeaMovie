import s from './Header.module.css'

export default function Header() {
  return (
    <header className={s.header_container}>
      <h2 className={s.header_title}>YeaMovie</h2>
      <div className={s.search_wrapp}>
        <input className={s.search_input} type="text" placeholder='Поиск...' />
        <button className={s.search_btn}>
          <img src="search.svg" alt="" />
        </button>
      </div>
    </header>
  )
}
