import React, { useState } from 'react';

function EditBrackets({ matchups, onUpdate }) {
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const [winner, setWinner] = useState('');

  const handleMatchupSelect = (event) => {
    setSelectedMatchup(event.target.value);
  };

  const handleWinnerSelect = (event) => {
    setWinner(event.target.value);
  };

  const handleSubmit = () => {
    const updatedMatchups = matchups.map(matchup => {
      if (matchup.id === selectedMatchup) {
        if (matchup.sides.home.team.name === winner) {
          matchup.sides.home.score = 1;
          matchup.sides.visitor.score = 0;
        } else if (matchup.sides.visitor && matchup.sides.visitor.team.name === winner) {
          matchup.sides.visitor.score = 1;
          matchup.sides.home.score = 0;
        }
      }
      return matchup;
    });
    onUpdate(updatedMatchups);
  };

  return (
    <div>
      <h2>Edit Brackets</h2>
      <div>
        <label>Select Matchup: </label>
        <select onChange={handleMatchupSelect}>
          <option value="">-- Select a Matchup --</option>
          {matchups.map(match => (
            <option key={match.id} value={match.id}>{match.name}</option>
          ))}
        </select>
      </div>
      {selectedMatchup && (
        <div>
          <label>Select Winner: </label>
          <select onChange={handleWinnerSelect}>
            <option value="">-- Select a Winner --</option>
            {matchups.filter(m => m.id === selectedMatchup).map(match => (
              <>
                <option key={match.sides.home.team.id} value={match.sides.home.team.name}>{match.sides.home.team.name}</option>
                {match.sides.visitor && <option key={match.sides.visitor.team.id} value={match.sides.visitor.team.name}>{match.sides.visitor.team.name}</option>}
              </>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleSubmit}>Declare Winner</button>
    </div>
  );
}

export default EditBrackets;
