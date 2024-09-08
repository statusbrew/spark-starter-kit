// import React from 'react';
import './About.css'; // Assuming you create CSS styles to complement the sections
import teamImage from '../assets/about_us_vector_removebg.png'; // Placeholder for team photo
import Navbar from './Navbar';
// import checkoutImage from '../assets/checkout.jpg'; // Placeholder for checkout functionality
// import navigationImage from '../assets/navigation.jpg'; // Placeholder for navigation system

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-page">

      {/* Project Title Section */}
      <section className="project-section">
        <h1 className="project-title">Jaldi Cart - Smart Navigation and Checkout System</h1>
        <p className="theme">Hackathon Theme: <strong>Revolutionizing Retail Shopping Experience</strong></p>
      </section>

      {/* Team Section */}
      <section className="team-section flex">
        <div className="flex" style={{flexDirection: 'column'}}>
        <h1>Meet Our Team</h1>
        <ul className="team-list">
          <li>Gurpreet Sarangal</li>
          
          <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yadunandan Bhardwaj</li>
          <li>Akash Gill</li>
          <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ankit Partap</li>
          <li>Tushar Anand</li>
        </ul>

        </div>
        <img src={teamImage} alt="Team working on the project" className="team-image right" />
      </section>

      {/* Project Overview Section */}
      <section className="overview-section">
        <h1>Project Overview</h1>
        <p>
          <b> Jaldi Cart </b> is a web application designed to transform how people shop in large malls. Our objective is to eliminate long checkout lines and optimize navigation through malls, providing a seamless shopping experience.
        </p>
        </section>
        
    </div>
    </>

  );
};

export default About;
