import React from 'react';

function SingleEliminationBracket({ participants }) {
  // Assuming participants is an array of teams
  const bracketRounds = [];

  const createInitialRound = () => {
    const initialRound = [];
    for (let i = 0; i < participants.length; i += 2) {
      initialRound.push([participants[i], participants[i + 1]]);
    }
    return initialRound;
  };

  const createNextRound = (prevRound) => {
    const nextRound = [];
    for (let i = 0; i < prevRound.length; i += 2) {
      const winner = Math.random() < 0.5 ? prevRound[i] : prevRound[i + 1];
      nextRound.push(winner);
    }
    return nextRound;
  };

  while (participants.length > 1) {
    const round = bracketRounds.length === 0 ? createInitialRound() : createNextRound(bracketRounds[bracketRounds.length - 1]);
    bracketRounds.push(round);
  }

  return (
    <div className="single-elimination-bracket">
      {bracketRounds.map((round, roundIndex) => (
        <div key={roundIndex} className="bracket-round">
          {round.map((matchup, matchIndex) => (
            <div key={matchIndex} className="bracket-match">
              {matchup[0]} vs {matchup[1]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SingleEliminationBracket;
