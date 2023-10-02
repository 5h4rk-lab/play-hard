import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../firebase'; // adjust as needed

function RegisteredTournaments() {
  const [registrations, setRegistrations] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return; // return early if there is no user
      try {
        const registrationsCollection = collection(db, 'registrations');
        const q = query(registrationsCollection, where('userId', '==', user.uid));
        const registrationsSnapshot = await getDocs(q);
        const registrationsList = registrationsSnapshot.docs.map(doc => doc.data());
        setRegistrations(registrationsList);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchRegistrations();
  }, [user]); // added user as a dependency

  return (
    <div>
      <h1>Registered Tournaments</h1>
      {registrations.length > 0 ? (
        <ul>
          {registrations.map((reg, index) => (
            <li key={index}>{reg.tournamentName}</li>
          ))}
        </ul>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
}

export default RegisteredTournaments;
  