import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CompanyProfiles from './CompanyProfiles';
import UserProfiles from './UserProfiles';

const AdminNavbar = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-light p-4 min-vh-100">
            <nav className="navbar navbar-expand-md navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav flex-column">
                  <li className="nav-item">
                    <Link to="/admin-login" className="nav-link">
                      Admin Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user-login" className="nav-link">
                      User Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/customer-login" className="nav-link">
                      Customer Login
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-md-9 p-4">
            <Route path="/company-profiles" component={CompanyProfiles} />
            <Route path="/all-users" component={UserProfiles} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AdminNavbar;