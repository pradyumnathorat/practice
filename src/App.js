
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Recipies from './components/Recipies';
import Recipe from './components/Recipe';
import CreateRecipe from './components/CreateRecipe';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/recipies" element={<Recipies/>}/>
          <Route path="/recipie" element={<Recipe/>}/>
          <Route path="/recipie/create" element={<CreateRecipe/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
