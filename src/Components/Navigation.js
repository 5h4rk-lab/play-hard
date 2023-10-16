import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import the CSS file

function Navigation({ user }) {
  return (
    <nav className="navigation"> {/* Add a class name */}
      <ul className="navigation-list"> {/* Add a class name */}
        {user ? (
          <>
            <li><Link to="/home" className="nav-link">Home</Link></li>
            <li><Link to="/create-tournament" className="nav-link">Create Tournament</Link></li>
            <li><Link to="/auth-details" className="nav-link">User Profile</Link></li>
            <li><Link to="/registered-tournaments" className="nav-link">Registered Tournaments</Link></li>
            {/* Other links visible when the user is signed in */}
          </>
        ) : (
          <>
            <li><Link to="/signin" className="nav-link">Sign In</Link></li>
            <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
            {/* Other links visible when the user is signed out */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
