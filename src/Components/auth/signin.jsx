import React, {useState} from "react";
import "./signin.css";
import {auth}  from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log(userCredential);
            // ...
        }).catch((error) => {
            console.log(error);
            // ..
        });
    }

    return( 
    <div className="sign-in-container">
        <form onSubmit={signin}>
            <h1>Sign In</h1>
            <input type="email" placeholder="enter your email"value={email}
            onChange={(e) => setEmail(e.target.value) }></input>
            <input type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Sign In</button>
            </form>
    </div>
    )
}


export default Signin;