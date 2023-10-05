import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Adjust the path to where you've initialized Firebase
import Navigation from './Components/Navigation';
import HomePage from './Components/HomePage';
import Signin from './Components/auth/signin';
import SignUp from './Components/auth/signup';
import AuthDetails from './Components/auth/authDetails';
import CreateTournament from './Components/CreateTournament';
import RegisteredTournaments from './Components/RegisteredTournaments';
import EditTournament from './Components/EditTournament'; // Adjust the path to your CreateTournament component

function App() {
  const [user, setUser] = useState(null); // local state to store the user

  useEffect(() => {
    // Subscribe to user on auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navigation user={user}/>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/home" /> : <Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth-details" element={<AuthDetails />} />
        <Route path="/edit-tournament/:tournamentId" element={<EditTournament />} />
        <Route path="/registered-tournaments" element={<RegisteredTournaments />} />
        <Route path="/edit/:tournamentId" element={<EditTournament />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/create-tournament" element={user ? <CreateTournament /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
