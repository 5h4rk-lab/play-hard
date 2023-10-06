import React from 'react';

function DoubleEliminationBracket({ participants }) {
  // Assuming participants is an array of teams
  const winnersBracket = [];
  const losersBracket = [];

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
    const round = winnersBracket.length === 0 ? createInitialRound() : createNextRound(winnersBracket[winnersBracket.length - 1]);
    winnersBracket.push(round);
    participants = round.map(matchup => Math.random() < 0.5 ? matchup[0] : matchup[1]);
  }

  return (
    <div className="double-elimination-bracket">
      <div className="winners-bracket">
        {winnersBracket.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            {round.map((matchup, matchIndex) => (
              <div key={matchIndex} className="bracket-match">
                {matchup[0]} vs {matchup[1]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="losers-bracket">
        {losersBracket.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            {round.map((matchup, matchIndex) => (
              <div key={matchIndex} className="bracket-match">
                {matchup[0]} vs {matchup[1]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoubleEliminationBracket;
