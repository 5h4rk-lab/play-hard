import React, {useState} from "react";
import "./signin.css";
import {auth}  from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email, password)
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
    <div className="sign-up-container">
        <form onSubmit={SignUp}>
            <h1>Create an accout</h1>
            <input type="email" placeholder="enter your email"value={email}
            onChange={(e) => setEmail(e.target.value) }></input>
            <input type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Sign Up</button>
            </form>
    </div>
    )
}


export default SignUp;