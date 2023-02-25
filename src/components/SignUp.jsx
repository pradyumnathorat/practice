import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [redirect, setredirect] = useState(false);

    const register = () => {
        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => res.json()
        ).then((data) => {
            console.log(data);
            if (data.error) {
                alert(data.error)
            } else {
                setEmail("")
                setPassword("")
                setCPassword("")
                alert(data.message)
                setredirect(true)
            }
        })
    }

    const performRedirect = () =>{
        if (redirect){
            return <Navigate to="/" />
        }
    }
    return (
        <>
        {performRedirect()}
            <div>
                <h1>SignUp</h1>
            </div>
            <div>
                <input type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div>
                <input type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div>
                <input type="text" placeholder='Repeat Password' onChange={(e) => { setCPassword(e.target.value) }} value={Cpassword} />
            </div>
            <div>
                <button onClick={register}>SignUp</button>
            </div>
        </>

    )
}

export default SignUp;