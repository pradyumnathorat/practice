
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Recipies from './components/allRecipe/Recipies';
import Recipe from './components/RecipeCard/Recipe';
import CreateRecipe from './components/CeateRecipe/CreateRecipe';
import PrivateRoute from './components/auth/PrivateRoute';
import CardDetails from './components/cardDetails/CardDerails';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/recipies" element={<PrivateRoute Child={Recipies}/>}/>
          <Route path="/recipie" element={<Recipe/>}/>
          <Route path="/upload" element={<CreateRecipe/>}/>
          <Route path="/cards/:id" element={<CardDetails/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
