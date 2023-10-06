import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './../firebase';
import { useNavigate, Link } from 'react-router-dom';
import ViewBrackets from './Brackets/Viewbrackets';

function RegisteredTournaments() {
  const [registrations, setRegistrations] = useState([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return;
      try {
        const userId = user.uid;
        const registrationsCollection = collection(db, 'registrations');
        const q = query(registrationsCollection, where('userId', '==', userId));
        const registrationsSnapshot = await getDocs(q);
        const registrationsList = registrationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegistrations(registrationsList);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
  
    fetchRegistrations();
  }, [user]);

  const deregisterFromTournament = async (registrationId) => {
    try {
      const registrationDocRef = doc(db, 'registrations', registrationId);
      await deleteDoc(registrationDocRef);
      const updatedRegistrations = registrations.filter(reg => reg.id !== registrationId);
      setRegistrations(updatedRegistrations);
      navigate('/registered-tournaments');
    } catch (error) {
      console.error('Error deregistering from tournament:', error);
    }
  };

  const [tournamentId, setTournamentId] = useState('');

  return (
    <div>
      <h1>Registered Tournaments</h1>
      {registrations.length > 0 ? (
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id}>
              {reg.tournamentName}
              <button onClick={() => deregisterFromTournament(reg.id)}>Deregister</button>
              {reg.createdBy === auth.currentUser.uid && (
                <Link to={`/edit/${reg.tournamentId}`}>Edit</Link>
              )}
              <button onClick={() => setTournamentId(reg.tournamentId)}>View Brackets</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No registrations found.</p>
      )}

      {tournamentId && <ViewBrackets tournamentId={tournamentId} />}
    </div>
  );
}

export default RegisteredTournaments;
