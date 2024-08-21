import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          My App
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-profiles">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavbar;