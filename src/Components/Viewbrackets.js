import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from './../firebase';

function ViewBrackets() {
  const { tournamentId } = useParams();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        // Create a query to get registrations for the specified tournamentId
        const registrationsCollectionRef = collection(db, 'registrations');
        const q = query(registrationsCollectionRef, where('tournamentId', '==', tournamentId));

        // Fetch registered users based on the query
        const registrationsSnapshot = await getDocs(q);

        // Extract user data from the snapshot
        const users = [];
        registrationsSnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push(userData.userId); // Assuming you store the userId in the registration document
        });

        // Set the registered users state
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
      {/* Add UI to display brackets here */}
    </div>
  );
}

export default ViewBrackets;
