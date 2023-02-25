import React, { useState , useEffect} from 'react'
import { getUserEmail } from '../helper'
import Recipe from './Recipe';


const Recipies = () => { 
    const [recipes , setRecipes] = useState([]);
    let user = localStorage.getItem('user');
    console.log(user)
    const getRescipe = () =>{
        fetch(`http://localhost:4000/user/recipe/${user}`)
        .then(res => res.json())
        .then((data) => {
            if ( data.error) {
                alert(data.error)
            }else{
                setRecipes(data);
                
            }
        })
        console.log(recipes)
    }

    useEffect(() => {
        getRescipe()
    } , [])

  return (
    <>
    <p>hello</p>
    {
        recipes.map((recipe) => (
            <Recipe recipe={recipe}/>
        ))
    }
    </>
  )
}

export default Recipies