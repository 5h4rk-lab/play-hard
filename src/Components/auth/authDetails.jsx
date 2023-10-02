import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth"; // Import the signOut function from Firebase

const AuthDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return listen;
  }, []);

  // Rename the local signOut function to avoid conflicts
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="auth-details-container">
      {user ? (
        <>
          <h1>{`Logged In as ${user.email}`}</h1>
          <button onClick={handleSignOut}>Signout</button>
        </>
      ) : (
        <h1>Logged Out</h1>
      )}
    </div>
  );
};

export default AuthDetails;
