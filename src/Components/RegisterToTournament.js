import React, { useState } from 'react';
import { db, auth } from './../firebase'; // adjust the import if needed
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function RegisterToTournament({ tournamentId, tournamentName }) {
  const userId = auth.currentUser?.uid; 
  const [status, setStatus] = useState('');

  const handleRegister = async () => {
    if (!userId) {
      setStatus('You need to sign in to register.');
      return;
    }

    // Check to see if the user is already registered
    const registrationsCollection = collection(db, 'registrations');
    const q = query(
      registrationsCollection, 
      where('userId', '==', userId),
      where('tournamentId', '==', tournamentId)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setStatus('You are already registered for this tournament.');
      return;
    }
    
    try {
      await addDoc(registrationsCollection, {
        userId,
        tournamentId,
        tournamentName,
        timestamp: new Date(), 
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
