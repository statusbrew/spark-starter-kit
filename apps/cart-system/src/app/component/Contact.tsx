// src/components/Contact.jsx
import React from 'react';
import './Contact.css';
import Navbar from './Navbar';
import "./Navbar.css";


const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="contact-page">
      <div className="contact-details">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us!</p>
        
        <div className="contact-info">
          <div className="info-item">
            <h3>Address:</h3>
            <p>Guru Nanak Dev University<br />City Amritsar, Punjab, </p>
          </div>

          <div className="info-item">
            <h3>Phone:</h3>
            <p>+91 9872567984</p>
          </div>

          <div className="info-item">
            <h3>Email:</h3>
            <p>info@jaldi-cart.com</p>
          </div>
        </div>
      </div>

      
    </div>
    </>

  );
};

export default Contact;
