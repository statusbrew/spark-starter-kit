import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import About from '../component/About';
import Contact from '../component/Contact';
import landing from '../assets/landing.png';



function Landing(){
    return(
        

        <div>
            <Navbar />
            <LandingPage />
        </div>
        
    )
}

function LandingPage() {
    return (
      <div className="landing-content-wrapper-flex">
        <div className="landing-content">
          <div className="landing-content-container">
            <h1>Welcome to Jaldi Cart!</h1>
            <p>
              Innovative solution designed to streamline the shopping experience by making checkout and billing faster, more efficient, and hassle-free. Our system leverages cutting-edge technology such as QR code scanning and mobile integration to provide a seamless shopping journey from start to finish.
            </p>
            <Link to="/cart" >
            <button className="start-scanning">Start Shopping</button>
            </Link>
          </div>
        </div>
  
        <div className="image-container">
          <img src={landing} alt="Landing" className="logo1" />
        </div>
      </div>
    );
  }

export default Landing