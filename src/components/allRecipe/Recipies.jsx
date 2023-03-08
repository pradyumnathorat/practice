import React, { useState, useEffect } from 'react'
// import { getUserEmail } from '../helper'
import Recipe from '../RecipeCard/Recipe';
import "./Recipies.css";
import Header from '../header/header';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';

const Recipies = () => {
    const [recipes, setRecipes] = useState([]);
    const [redirect, setredirect] = useState(false);
    const [redirectHome, setredirectHome] = useState(false);
    const [query, setQuery] = useState("");
    const url = process.env.REACT_APP_API;
    const token = isAuthenticated();
    // console.log(user)
    console.log(recipes);
    const getRescipe = () => {
        fetch(`${url}/upload`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                authorization: `${token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setRecipes(data.data);
                    console.log(data)
                }
            })
    }

    const filteredItems = recipes.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredItems);
    console.log(query);

    useEffect(() => {
        getRescipe()
    }, [])

    const handleClick = () => {
        setredirect(true);
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/upload" />
        }
    }

    const handleDataReceived = (data) => {
        setQuery(data);
    }

    const handleRedirect = (data) => {
        setredirectHome(data)
    }

    const performRedirecHome = () => {
        if (redirectHome) {
            return <Navigate to="/recipies" />
        }
    }

    return (
        <>
            {performRedirect()}
            
            <Header onDataReceived={handleDataReceived} onRedirect={handleRedirect}/>
            <div className="newConatainer">
                <div className="new" onClick={handleClick}>New</div>
            </div>
            <div className="allRecipies">
                All recipes
            </div>
            <div className="allCards">
                {
                        !query ? 
                        recipes.map((recipe, index) => (
                            <Link to={`/cards/${recipe._id}`}><Recipe recipe={recipe} /></Link>
                        )) :
                        filteredItems.map((recipe, index) => (
                            <Link to={`/cards/${recipe._id}`}><Recipe recipe={recipe} /></Link>
                        )) 
                }
            </div>

        </>
    )
}

export default Recipies