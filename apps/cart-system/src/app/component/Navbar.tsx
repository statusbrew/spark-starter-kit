import React, { useState } from 'react';
import logo1 from '../assets/logo1.png';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-logo">
            <img src={logo1} alt="Company Logo" className="logo" />
            <h1 className="head">Jaldi Cart</h1>
          </div>
        </Link>
        {/* Navbar Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Burger Menu Toggle Button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
