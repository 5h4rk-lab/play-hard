import React, {useEffect,useState} from "react";
import {auth}  from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
       const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            });

            return listen;
        },[]);

        const signOut = () => {
            auth.signOut().then(() => {
                // Sign-out successful.
                }).catch((error) => {
                // An error happened.
                });
        }

    return(
        <div className="auth-details-container">
            {user ?<><h1>{`Logged In as ${user.email}`}</h1><button onClick={signOut}>Signout</button></>:<h1>Logged Out</h1>}


        </div>
    )
}


export default AuthDetails;