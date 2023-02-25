import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
const CreateRecipe = () => {
    const [ title , setTitle] = useState("")
    const [ autor , setautor] = useState("")
    const [ ingredients , setingredients] = useState("")
    const [ directions , setdirections] = useState("")
    const [ url , seturl] = useState("")
    const [ redirect , setredirect] = useState(false);
    let user  = localStorage.getItem("user");
    const Submit = () => {
        fetch(`http://localhost:4000/recipe/${user}`, {
            method: "POST",
            body: JSON.stringify({
                title:title,
                autor:autor,
                ingredients:ingredients,
                directions:directions,
                url:url
            })
        }).then((res) => res.json()
        ).then((data) => {
            console.log(data);
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
                setredirect(true)
            }
        })
    }
    const performRedirect = () =>{
        if (redirect){
            return <Navigate to="/recipies" />
        }
    }
    
  return (
    <>
    {performRedirect()}
    <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} value={title}/>
    <input type="text" placeholder="autor" onChange={(e) => {setautor(e.target.value)}} value={autor}/>
    <input type="text" placeholder="ingredients" onChange={(e) => {setingredients(e.target.value)}} value={ingredients}/>
    <input type="text" placeholder="directions" onChange={(e) => {setdirections(e.target.value)}} value={directions}/>
    <input type="text" placeholder="url" onChange={(e) => {seturl(e.target.value)}} value={url}/>
    <button onClick={Submit}>Create</button>
    </>
  )
}

export default CreateRecipe