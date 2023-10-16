import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

function RandomizeBrackets({ tournamentId }) {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const registrationsCollectionRef = collection(db, 'registrations');
            const q = query(registrationsCollectionRef, where('tournamentId', '==', tournamentId));
            const registrationsSnapshot = await getDocs(q);
            const users = [];
            registrationsSnapshot.forEach(doc => {
                users.push(doc.data().userId);
            });
            setParticipants(users);
        };

        fetchParticipants();
    }, [tournamentId]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const generateRandomMatchups = async () => {
        const shuffledParticipants = shuffleArray([...participants]);
        const matchups = [];
        for (let i = 0; i < shuffledParticipants.length; i += 2) {
            matchups.push([shuffledParticipants[i], shuffledParticipants[i + 1]]);
        }
        
        const bracketDocRef = doc(db, 'brackets', tournamentId);
        try {
            await setDoc(bracketDocRef, { matchups });
            console.log('Brackets updated successfully!');
        } catch (error) {
            console.error('Error updating brackets:', error);
        }
    };

    return (
        <div>
            <h2>Randomize Brackets</h2>
            <button onClick={generateRandomMatchups}>Generate Random Matchups</button>
            {/* Display the matchups if needed */}
        </div>
    );
}

export default RandomizeBrackets;
