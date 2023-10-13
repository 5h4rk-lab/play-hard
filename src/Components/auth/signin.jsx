import React, {useState} from "react";
import "./signin.css";
import {auth , GoogleAuthProvider , signInWithPopup}  from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/home'); // Redirect to Home Page on successful sign-in
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
  
      signInWithPopup(auth, provider)
          .then((userCredential) => {
              console.log(userCredential);
              navigate('/home'); // Redirect to Home Page on successful sign-in
          })
          .catch((error) => {
              console.log(error);
          });
  };

    return( 
    <div className="sign-in-container">
        <form onSubmit={signin}>
            <h1>Sign In</h1>
            <input type="email" placeholder="enter your email"value={email}
            onChange={(e) => setEmail(e.target.value) }></input>
            <input type="password" placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Sign In</button>
        </form>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
    )
}

export default Signin;
