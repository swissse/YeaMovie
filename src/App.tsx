import { Route, Routes } from 'react-router';
import HomePage from './features/home/HomePage';
import SearchPage from './features/search/SearchPage';
import MovieDetails from './features/movieDetails/MovieDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
