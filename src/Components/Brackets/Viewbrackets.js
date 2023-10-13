import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
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


function ViewBrackets({ tournamentId }) {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const registrationsCollectionRef = collection(db, 'registrations');
        const q = query(registrationsCollectionRef, where('tournamentId', '==', tournamentId));
        const registrationsSnapshot = await getDocs(q);
        const users = [];
        registrationsSnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push(userData.userId);
        });

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
        {registeredUsers.map((userId, index) => (
          <li key={index}>{userId}</li>
        ))}
      </ul>
      {registeredUsers.length > 0 && <Brackets users={registeredUsers} />}
    </div>
  );
}

export default ViewBrackets;
