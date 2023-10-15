import React, { useState } from "react";
import "./signin.css";
import { auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, db, doc, setDoc } from "../../firebase";
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const storeUserData = (user) => {
    const userDocRef = doc(db, 'users', user.uid);
    setDoc(userDocRef, {
      username: user.displayName || email.split('@')[0], 
      email: user.email,
    }, { merge: true });
  };

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        storeUserData(userCredential.user);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        storeUserData(userCredential.user);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signin}>
        <h1>Sign In</h1>
        <input 
          type="email" 
          placeholder="enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  )
}

export default Signin;
