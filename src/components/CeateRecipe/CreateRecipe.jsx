import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { isAuthenticated } from '../../helper/helper';
import "./createRecipe.css";
const CreateRecipe = () => {
    const [title, setTitle] = useState("")
    const [author, setautor] = useState("")
    const [ingredients, setingredients] = useState("")
    const [description, setdirections] = useState("")
    const [redirect, setredirect] = useState(false);
    const [image, setimage] = useState("");
    const [url, seturl] = useState("");
    const urlE = process.env.REACT_APP_API;
    const token = isAuthenticated();
    const Submit = async () => {

        if (title && author && ingredients && description) {
            let newUrl = "";
            try {
                if (url == "") {
                    const formdata = new FormData();
                    formdata.append('file', image);
                    formdata.append('upload_preset', 'a0wrwejc');
                    const response = await axios.post('https://api.cloudinary.com/v1_1/daie9oojw/image/upload', formdata)
                    console.log(response.data.url);
                    newUrl = response.data.url;
                    console.log("hello");
                } else {
                    newUrl = url
                }
                const data = await fetch(`${urlE}/upload`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        authorization: `${token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        author: author,
                        ingredients: ingredients,
                        description: description,
                        url: newUrl
                    })
                })
                const dataJson = await data.json();
                if (dataJson.error) {
                    alert(dataJson.error)
                } else {
                    alert(dataJson.message)
                    setredirect(true)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Please fill all fields");
        }
    }
    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/recipies" />
        }
    }

    return (
        <>
            {performRedirect()}
            <div className="input-container">
                <div className="container2">
                    <h1>Create Recipe</h1>
                    <input className="inputs1" type="text" placeholder="Recipe Title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                    <input className="inputs1" type="text" placeholder="Autor" onChange={(e) => { setautor(e.target.value) }} value={author} />
                    <input className="inputs1" type="file" placeholder="Upload Image" onChange={(e) => { setimage(e.target.files[0]) }} />
                    <input className="inputs1" type="text" placeholder="Please Upload image or paste url" onChange={(e) => { seturl(e.target.value) }} value={url} />
                    <input className="inputs1" type="text" placeholder="Ingredients" onChange={(e) => { setingredients(e.target.value) }} value={ingredients} />
                    <input className="inputs1" type="text" placeholder="Directions" onChange={(e) => { setdirections(e.target.value) }} value={description} />
                    <button className="create" onClick={Submit}>Create</button>
                </div>
            </div>
        </>
    )
}

export default CreateRecipe