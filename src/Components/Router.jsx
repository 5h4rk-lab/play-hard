import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage component
import SignIn from './components/SignIn'; // Import SignIn component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" component={SignIn} />
        <Route path="/home" component={HomePage} />
    </Routes>
    </Router>
  );
}

export default App;
