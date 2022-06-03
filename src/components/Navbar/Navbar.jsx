import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { signUserOut } from '../utilities/user-utilities';

function Navbar({user}){
  return(
  <div className="navbar">
    <div className="navbar-links_container">
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      <Link to="/kicks">
        <button type="button">Kicks</button>
      </Link>
        {(!user || !user.isLoggedIn) &&
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
        }
        {user && user.isLoggedIn &&
        <Link to="/">
          <button type="button" onClick={signUserOut}>Logout</button>
        </Link>
        }
    </div>
  </div>
  );
};

export default Navbar;