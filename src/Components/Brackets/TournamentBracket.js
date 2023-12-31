import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SingleEliminationBracket from './SingleEliminationBracket';
import DoubleEliminationBracket from './DoubleEliminationBracket';

function TournamentBracket() {
  const { tournamentId } = useParams();
  const [tournamentData, setTournamentData] = useState(null);
  const [participantNames, setParticipantNames] = useState([]);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const tournamentDocRef = doc(db, 'tournaments', tournamentId);
      const tournamentSnapshot = await getDoc(tournamentDocRef);
      if (tournamentSnapshot.exists()) {
        const data = tournamentSnapshot.data();
        setTournamentData(data);

        const userIds = data.participants;
        const userPromises = userIds.map((id) => doc(db, 'users', id).get());
        const userDocs = await Promise.all(userPromises);

        const names = userDocs.map(doc => doc.data().username);
        setParticipantNames(names);
      }
    };

    fetchTournamentData();
  }, [tournamentId]);

  if (!tournamentData || participantNames.length === 0) {
    return <div>Loading...</div>;
  }

  const { bracketType } = tournamentData;

  return (
    <div className="tournament-bracket">
      <h1>Tournament Bracket</h1>
      {bracketType === 'single-elimination' && <SingleEliminationBracket participants={participantNames} />}
      {bracketType === 'double-elimination' && <DoubleEliminationBracket participants={participantNames} />}
    </div>
  );
}

export default TournamentBracket;
