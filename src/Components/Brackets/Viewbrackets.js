import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import './viewbrackets.css';


function Brackets({ users }) {
  function generateTree(users) {
      // If there's just one user, return them
      if (users.length === 1) {
          return users[0];
      }
      
      // Check if the number of users is not a power of two
      const isPowerOfTwo = (num) => (num & (num - 1)) === 0;
      if (!isPowerOfTwo(users.length)) {
          // Add dummy placeholders to fill in the gaps
          while (!isPowerOfTwo(users.length)) {
              users.push('BYE');
          }
      }

      let mid = Math.floor(users.length / 2);
      return {
          left: generateTree(users.slice(0, mid)),
          right: generateTree(users.slice(mid))
      };
  }

  function renderTree(node) {
      if (typeof node === 'string') {
          return <div className="box">{node}</div>;
      }

      return (
          <div className="branch">
              {renderTree(node.left)}
              <div className="pair">
                  <div className="horizontal-line"></div>
                  {renderTree(node.right)}
              </div>
              <div className="line"></div>
          </div>
      );
  }

  let tree = generateTree(users);

  return <div className="bracket">{renderTree(tree)}</div>;
}


async function getUsernameByUserId(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
      return userDoc.data().username;
  } else {
      return "Unknown User"; // or return userId or any fallback
  }
}

function ViewBrackets({ tournamentId }) {
const [registeredUsers, setRegisteredUsers] = useState([]);

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

      const users = await Promise.all(usersPromises); // fetch all usernames in parallel

      setRegisteredUsers(users);
    } catch (error) {
      console.error('Error fetching registered users:', error);
    }
  };

  fetchRegisteredUsers();
}, [tournamentId]);

return (
  <div>
    <h1>Tournament Brackets</h1>
    <h2>Registered Users</h2>
    <ul>
      {registeredUsers.map((username, index) => (
        <li key={index}>{username}</li>
      ))}
    </ul>
    {registeredUsers.length > 0 && <Brackets users={registeredUsers} />}
  </div>
);
}

export default ViewBrackets;