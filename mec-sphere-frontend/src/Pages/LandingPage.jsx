import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./LandingPage.css";
import image from "../Images/model.jpeg";

export default function LandingPage() {
    return (
        <div className='landing'>
            <section className="main" id="header">
                
                    
                <div className="hero">
                    <div className="hero--content">
                        <h1>MECSphere.</h1>
                        <h1><span className="multiple-text"></span></h1>
                        <p className='catchphrase'>"MECSphere: Where college connections thrive, careers take flight, and knowledge finds its community."</p>
                        {/* Wrap the button with Link */}
                        <Link to="/login">
                            <button className="button-65" role="button">GET STARTED</button>
                        </Link>
                    </div>  
                    <div className="hero--img">
                        <img src={image} alt="why no werk" />
                    </div>  
                </div>
                <img className='circle' src="" alt="" />
            </section>
        </div>
    );
}
