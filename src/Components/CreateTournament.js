import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './../firebase'; // Import auth to get the user's UID
import { useNavigate  } from 'react-router-dom';  


function CreateTournament() {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [bracketType, setBracketType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      const tournamentData = {
        name: tournamentName,
        date: tournamentDate,
        bracketType,
        createdBy: user.uid, // Include the UID of the user who created the tournament
      };

      await addDoc(collection(db, 'tournaments'), tournamentData);

      // Reset the form or navigate to another page
      setTournamentName('');
      setTournamentDate('');
      setBracketType('');
      console.log('Tournament created successfully');
      <p>tournament created successfully</p>
      navigate('/home')
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tournament Name:
        <input type="text" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} required />
      </label>
      <label>
        Tournament Date:
        <input type="date" value={tournamentDate} onChange={(e) => setTournamentDate(e.target.value)} required />
      </label>
      <label>
        Bracket Type:
        <select value={bracketType} onChange={(e) => setBracketType(e.target.value)} required>
          <option value="">Select Bracket Type</option>
          <option value="single-elimination">Single Elimination</option>
          <option value="double-elimination">Double Elimination</option>
          {/* Add more bracket types as needed */}
        </select>
      </label>
      <button type="submit">Create Tournament</button>
    </form>
  );
}

export default CreateTournament;
