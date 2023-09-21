// src/App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Auth from './Components/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <h1>Esports Tournament Website</h1>
      {user ? (
        <div>
          {/* User is signed in */}
          <p>Welcome, {user.email}!</p>
          {/* Add sign-out button */}
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
