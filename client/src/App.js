import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LandingPage  from './components/LandingPage.jsx';
import Home  from './components/Home.jsx';
import PokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/PokemonDetail'
import { match } from 'assert';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' element= {<LandingPage />} />
        <Route path = '/home' element = { <Home /> } />
        <Route path='/pokemons' element= {<PokemonCreate />} />
        <Route path='/pokemons/:id' element= {<PokemonDetail  />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
