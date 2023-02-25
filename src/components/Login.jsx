import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setredirect] = useState(false);

    const HandleLogin = () => {
        fetch("http://localhost:4000/", {
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
                localStorage.setItem("token", JSON.stringify(data.token))
                localStorage.setItem("user", data.user)
                setEmail("")
                setPassword("")
                alert(data.message)
                setredirect(true);

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
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <input type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div>
                <input type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div>
                <button onClick={HandleLogin}>Login</button>
            </div>
        </>

    )
}

export default Login