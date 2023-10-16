import React, { useEffect, useState } from 'react';
import { Bracket } from 'react-tournament-bracket';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase';

async function getUsernameByUserId(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data().username;
  } else {
    return "Unknown User"; 
  }
}

function generateFirstRoundMatches(users) {
  const shuffledUsers = users.sort(() => 0.5 - Math.random());
  let matchups = [];
  
  for (let i = 0; i < shuffledUsers.length; i += 2) {
    const home = shuffledUsers[i];
    const visitor = i + 1 < shuffledUsers.length ? shuffledUsers[i + 1] : null;
    const match = {
      id: `1-${i}`,
      name: `Round 1 Match ${i / 2 + 1}`,
      sides: {
        home: { team: { id: home, name: home }, score: null },
        visitor: visitor ? { team: { id: visitor, name: visitor }, score: null } : null
      }
    };
    matchups.push(match);
  }
  
  return matchups;
}

function ViewBrackets({ tournamentId }) {
  const [matchups, setMatchups] = useState([]);
  
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const registrationsCollectionRef = collection(db, 'registrations');
        const q = query(registrationsCollectionRef, where('tournamentId', '==', tournamentId));
        const registrationsSnapshot = await getDocs(q);
        const usersPromises = [];
        
        registrationsSnapshot.forEach((doc) => {
          const userData = doc.data();
          usersPromises.push(getUsernameByUserId(userData.userId));
        });
        
        const users = await Promise.all(usersPromises);

        const firstRound = generateFirstRoundMatches(users);
        setMatchups(firstRound);
      } catch (error) {
        console.error('Error fetching registered users:', error);
      }
    };

    fetchRegisteredUsers();
  }, [tournamentId]);
  
  return (
    <div>
      <h1>Tournament Brackets</h1>
      {matchups.map((matchup, index) => (
        <div key={index}>
          <Bracket game={matchup} />
        </div>
      ))}
    </div>
  );
}

export default ViewBrackets;
