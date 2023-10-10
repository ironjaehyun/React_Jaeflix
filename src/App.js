import Header from './components/Header';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies/:id' element={<MovieDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
