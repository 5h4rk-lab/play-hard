import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase';
import SingleEliminationBracket from './SingleEliminationBracket';
import DoubleEliminationBracket from './DoubleEliminationBracket';
import './TournamentBracket.css'; // Import your CSS file for styling

function TournamentBracket() {
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = useState(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const tournamentDocRef = doc(db, 'tournaments', tournamentId);
      const tournamentSnapshot = await getDoc(tournamentDocRef);
      if (tournamentSnapshot.exists()) {
        const data = tournamentSnapshot.data();
        setTournamentData(data);
      }
    };

    fetchTournamentData();
  }, [tournamentId]);

  if (!tournamentData) {
    return <div>Loading...</div>;
  }

  const { bracketType, participants } = tournamentData;

  return (
    <div className="tournament-bracket">
      <h1>Tournament Bracket</h1>
      {bracketType === 'single-elimination' && <SingleEliminationBracket participants={participants} />}
      {bracketType === 'double-elimination' && <DoubleEliminationBracket participants={participants} />}
    </div>
  );
}

export default TournamentBracket;
