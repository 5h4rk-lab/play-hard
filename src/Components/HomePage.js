import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db, auth } from './../firebase';
import { Link } from 'react-router-dom';
import RegisterToTournament from './RegisterToTournament';
import './HomePage.css';

function HomePage() {
  const [tournaments, setTournaments] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTournaments = async () => {
      const tournamentsCollection = collection(db, 'tournaments');
      const tournamentsSnapshot = await getDocs(tournamentsCollection);
      const tournamentsList = tournamentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      for (let tourney of tournamentsList) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
        const pokemonData = await response.json();
        tourney.pokemonImage = pokemonData.sprites.front_default;
      }

      setTournaments(tournamentsList);
    };

    fetchTournaments();
  }, []);

  return (
    <div className="tournaments">
      <h1>Home Page</h1>
      <h2>Here is the list of tournaments</h2>
      <div className="tournaments-list">
        {tournaments.map(tournament => (
          <div className="tournament-card" key={tournament.id}>
            <div className="card-inner">
              <div className="card-front">
                {tournament.pokemonImage && <img src={tournament.pokemonImage} alt="Pokemon" className="pokemon-image" />}
                <h3>{tournament.name}</h3>
                <p>{tournament.date}</p>
              </div>
              <div className="card-back">
                <p>Description: {tournament.description || 'No description provided'}</p>
                <RegisterToTournament userId={user?.uid} tournamentId={tournament.id} tournamentName={tournament.name} />
                {tournament.createdBy === user?.uid && ( 
                  <Link to={`/edit/${tournament.id}`}>Edit</Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/registered-tournaments">View Registered Tournaments</Link>
    </div>
  );
}

export default HomePage;
