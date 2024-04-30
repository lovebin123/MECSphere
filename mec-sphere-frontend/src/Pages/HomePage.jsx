import React from 'react'
import "./HomePage.css"
import  image from "../Images/mec.jpg"
import cs from "../Images/cs.png"
import ec from "../Images/ec.png"
import eee from "../Images/eee.png"
import mech from "../Images/mech.png"
import bio from "../Images/bio.png"
import applied from "../Images/science.png"


const HomePage = () => {
  return (
    <div>
        <h1 className='heading'>MODEL ENGINEERING COLLEGE</h1>

        <div className='upper-body'>

            <div className='upper-left'>
                <h2 className='about'>ABOUT</h2>
                <div className='line'></div>
                <p className='info'>For the past 28 years Govt. Model Engineering College has empowered its students to pave the way for excellence and innovation in the field of engineering and technology. The institute is affiliated to the APJ Abdul Kalam Technological University (KTU), and was the first engineering college to be established by the Government of Kerala under the aegis of the institute of Human Resource Development (IHRD). The college was previously affiliated to Cochin University of Science and Technology (CUSAT) and has witnessed record breaking placements year after year.</p>
                <button className='bttn'><a href="https://www.mec.ac.in/">Know More</a></button>
            </div>
            <div className='upper-right'>
                <img src={image} alt="no img" className='pic'/>
            </div>
            
        </div>

        <div className='lower-body'>
            <h2 className='department'>OUR DEPARTMENTS</h2>
            <div className="line"></div>
            <div className="container">
            <div className="box">
  <img src={cs} alt="nope" className="logo" />
  <h3 className='sub'>Computer Engineering</h3>
  <p className='desc'>Expanding student expertise in technology in the world of programming.</p>
</div>
<div className="box">
  <img src={ec} alt="" className="logo" />
  <h3 className='sub'>Electronics Engineering</h3>
  <p className='desc'>Study, design and application in the electrical field and equipment.</p>
</div>
<div className="box">
  <img src={mech} alt="" className="logo" />
  <h3 className='sub'>Mechanical Engineering</h3>
  <p className='desc'>Application of the principles and problem-solving techniques of engineering from design to manufacturing to the marketplace for any products or services.</p>
</div>
<div className="box">
  <img src={eee} alt="" className="logo" />
  <h3 className='sub'>Electrical Engineering</h3>
  <p className='desc'>Coming to the extent of circuits and the digital world of communication via experienced learning.</p>
</div>
<div className="box">
  <img src={bio} alt="" className="logo" />
  <h3 className='sub'>BioMedical Engineering</h3>
  <p className='desc'>Designs concepts to medicine and biology for healthcare facilities and technology behind the medical equipment.!</p>
</div>
<div className="box">
  <img src={applied} alt="" className="logo" />
  <h3 className='sub'>Applied Sciences</h3>
  <p className='desc'>Learn about the basic tools of analysis and principles on the basis of engineering.</p>
</div>

    </div>
        </div>
      
    </div>
  )
}

export default HomePage
