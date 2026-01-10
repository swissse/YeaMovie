import { Route, Routes } from 'react-router';
import HomePage from './features/home/HomePage';
import SearchPage from './features/search/SearchPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
