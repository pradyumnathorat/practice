import React from 'react'
import "./Recipe.css"
export const Recipe = ({recipe}) => {
    return (
        <>
            <div className="container">
                <img className="image" src={recipe.url} alt="recipeImage" />
                <p className="title">{recipe.title}</p>
            </div>
        </>
    )
}

export default Recipe;