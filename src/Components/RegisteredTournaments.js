import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './../firebase'; // adjust as needed
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import ViewBrackets from './Viewbrackets';

function RegisteredTournaments() {
  const [registrations, setRegistrations] = useState([]);
  const user = auth.currentUser;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return; // return early if there is no user
      try {
        const userId = user?.uid;
        console.log('User ID:', userId);
        const registrationsCollection = collection(db, 'registrations');
        const q = query(registrationsCollection, where('userId', '==', user?.uid)); // Add a null check for user
        const registrationsSnapshot = await getDocs(q);
        const registrationsList = registrationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegistrations(registrationsList);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
  
    fetchRegistrations();
  }, [user]);
  // added user as a dependency

  const deregisterFromTournament = async (registrationId) => {
    try {
      const registrationDocRef = doc(db, 'registrations', registrationId);
      await deleteDoc(registrationDocRef);
      // Refresh the registrations list after deregistering
      const updatedRegistrations = registrations.filter(reg => reg.id !== registrationId);
      setRegistrations(updatedRegistrations);
    } catch (error) {
      console.error('Error deregistering from tournament:', error);
    }
  };

  // Add a state variable to store the tournament ID
  const [tournamentId, setTournamentId] = useState('');

  // Inside your component's JSX, add a button that calls the handleViewBrackets function
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

      {/* Display the ViewBrackets component when tournamentId is set */}
      {tournamentId && <ViewBrackets tournamentId={tournamentId} />}
    </div>
  );
}

export default RegisteredTournaments;
