import React from 'react'
import Ingredients from './Ingredients';

export const Recipe = ({recipe}) => {
    return (
        <>
            <div>
                <img src={recipe.url} alt="recipeImage"/>
                <p>{recipe.title}</p>
            </div>
            <div>
                <Ingredients/>
            </div>
        </>
    )
}

export default Recipe;