import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {db} from './../firebase'; // adjust the path

function CreateTournament() {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tournamentData = {
        name: tournamentName,
        date: tournamentDate,
      };
      
      await addDoc(collection(db, 'tournaments'), tournamentData);
      
      // Reset the form or navigate to another page
      setTournamentName('');
      setTournamentDate('');
      console.log('Tournament created successfully');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
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
      <button type="submit">Create Tournament</button>
    </form>
  );
}

export default CreateTournament;
