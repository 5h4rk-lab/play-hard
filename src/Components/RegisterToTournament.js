import React, { useState } from 'react';
import { db, auth } from './../firebase'; // adjust the import if needed
import { collection, addDoc } from 'firebase/firestore';

function RegisterToTournament({ tournamentId, tournamentName }) {
  const userId = auth.currentUser?.uid; // get thbe herent user
  const [status, setStatus] = useState('');

  const handleRegister = async () => {
    if (!userId) {
      setStatus('You need to sign in to register.');
      return; // don't proceed if there's no user ID
    }

    // Debugging: Log the values of tournamentId and tournamentName
    console.log('tournamentdata', tournamentId);
    console.log('tournament name', tournamentName);
    
    const registrationsCollection = collection(db, 'registrations');
    try {
      await addDoc(registrationsCollection, {
        userId,
        tournamentId,
        tournamentName,
        timestamp: new Date(), // you can store the registration time if needed
        // ... other registration data
      });
      setStatus('User registered successfully');
    } catch (e) {
      console.error('Error registering user: ', e);
      setStatus('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <button onClick={handleRegister}>Register</button>
      {status && <p>{status}</p>}
    </>
  );
}

export default RegisterToTournament;
