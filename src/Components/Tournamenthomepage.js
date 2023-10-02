import React, { useEffect, useState } from 'react';
import db from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function TournamentHomePage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tournaments'));
        setTournaments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("Error fetching tournaments: ", err);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
      <h1>Tournament Home Page</h1>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>{tournament.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentHomePage;
