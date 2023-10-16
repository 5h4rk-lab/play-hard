import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const AuthDetails = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Fetch the user's details from Firestore
        const userDoc = doc(db, 'users', authUser.uid);
        const userData = await getDoc(userDoc);

        if (!userData.exists()) {
          // Create default username if not in Firestore
          let defaultUsername = authUser.displayName || authUser.email.split('@')[0];
          await setDoc(userDoc, {
            uid: authUser.uid,
            email: authUser.email,
            username: defaultUsername,
          });
          authUser.username = defaultUsername; // Add to our authUser object for immediate display
        } else {
          authUser.username = userData.data().username;
        }

        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return listen;
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const saveUsername = async () => {
    try {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { username }, { merge: true });
      setUser((prevUser) => ({ ...prevUser, username }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <div className="auth-details-container">
      {user ? (
        <>
          <h1>{`Logged In as ${user.username || user.email}`}</h1>
          {isEditing ? (
            <div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Edit Username"
              />
              <button onClick={saveUsername}>Save</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button onClick={handleSignOut}>Signout</button>
        </>
      ) : (
        <h1>Logged Out</h1>
      )}
    </div>
  );
};

export default AuthDetails;
