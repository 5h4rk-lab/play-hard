import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ user }) {
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/create-tournament">Create Tournament</Link></li>
            <li><Link to="/auth-details">User profile</Link></li>
            {/* Other links visible when the user is signed in */}
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            {/* Other links visible when the user is signed out */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
