import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'; 
import { db } from './../firebase';

function EditTournament() {
  const { tournamentId } = useParams();
  const history = useNavigate();

  const [tournament, setTournament] = useState(null);
  const [bracketType, setBracketType] = useState('');
  const [tournamentName, setTournamentName] = useState(''); // Add state for tournament name

  useEffect(() => {
    const fetchTournament = async () => {
      const tournamentDocRef = doc(db, 'tournaments', tournamentId);
      const tournamentSnapshot = await getDoc(tournamentDocRef);
      if (tournamentSnapshot.exists()) {
        const tournamentData = tournamentSnapshot.data();
        setTournament(tournamentData);
        setTournamentName(tournamentData.name || ''); // Set the tournament name from the tournament data
        setBracketType(tournamentData.bracketType || ''); // Set the bracket type from the tournament data
      }
    };

    fetchTournament();
  }, [tournamentId]);

  const handleBracketTypeChange = (e) => {
    setBracketType(e.target.value);
  };

  const handleTournamentNameChange = (e) => {
    setTournamentName(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (!tournament) return;

    const tournamentDocRef = doc(db, 'tournaments', tournamentId);
    try {
      await updateDoc(tournamentDocRef, {
        bracketType,
        name: tournamentName, // Update the tournament name
      });
      alert('Tournament updated successfully!');
    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  };

  const handleDeleteTournament = async () => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      const tournamentDocRef = doc(db, 'tournaments', tournamentId);
      try {
        // Fetch all registrations for the tournament
        const registrationsCollectionRef = collection(db, 'registrations');
        const registrationsQuery = query(registrationsCollectionRef, where('tournamentId', '==', tournamentId));
        const registrationsSnapshot = await getDocs(registrationsQuery);
  
        // Delete all registrations for the tournament
        const deletionPromises = [];
        registrationsSnapshot.forEach((doc) => {
          const registrationDocRef = doc(db, 'registrations', doc.id);
          deletionPromises.push(deleteDoc(registrationDocRef));
        });
  
        // Delete the tournament document
        deletionPromises.push(deleteDoc(tournamentDocRef));
  
        // Wait for all deletions to complete
        await Promise.all(deletionPromises);
  
        alert('Tournament and registrations deleted successfully!');
        history('/home'); // Redirect to the home page after deleting
      } catch (error) {
        console.error('Error deleting tournament:', error);
      }
    }
  };
  

  return (
    <div>
      {tournament && (
        <>
          <h1>Edit Tournament</h1>
          <label>
            Tournament Name:
            <input
              type="text"
              value={tournamentName}
              onChange={handleTournamentNameChange}
            />
          </label>
          <p>Tournament Date: {tournament.date}</p>
          <label>
            Bracket Type:
            <select value={bracketType} onChange={handleBracketTypeChange}>
              <option value="">Select Bracket Type</option>
              <option value="single-elimination">Single Elimination</option>
              <option value="double-elimination">Double Elimination</option>
              {/* Add more bracket types as needed */}
            </select>
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleDeleteTournament}>Delete Tournament</button>
        </>
      )}
    </div>
  );
}

export default EditTournament;
