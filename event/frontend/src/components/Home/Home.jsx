// src/components/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the homepage of our application. Navigate to other pages using the menu below:</p>

      {/* Navigation Menu */}
      <nav className="home-menu">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/eventdetail">Event Details</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
