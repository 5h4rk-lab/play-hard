import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db, auth } from './../firebase';
import { Link } from 'react-router-dom';
import RegisterToTournament from './RegisterToTournament';

function HomePage() {
  const [tournaments, setTournaments] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTournaments = async () => {
      const tournamentsCollection = collection(db, 'tournaments');
      const tournamentsSnapshot = await getDocs(tournamentsCollection);
      const tournamentsList = tournamentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTournaments(tournamentsList);
    };

    fetchTournaments();
  }, []);


  return (
    <div>
      <h1>Home Page</h1>
      <h2>Here is the list of tournaments</h2>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.name} {tournament.date} 
            <RegisterToTournament userId={user?.uid} tournamentId={tournament.id} />
          </li>
        ))}
      </ul>
      <Link to="/registered-tournaments">View Registered Tournaments</Link> {/* Link to the route showing the tournaments user is registered in */}
    </div>
  );
}

export default HomePage;

