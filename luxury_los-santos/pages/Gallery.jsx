import React from 'react';
import mission1 from './../images/mission1.png'
import mission2 from './../images/mission2.png'
import mission3 from './../images/mission3.png'
import mission4 from './../images/mission4.png'
import mission5 from './../images/mission5.png'
import mission6 from './../images/mission6.png'
import mission7 from './../images/mission7.png'
import mission8 from './../images/mission8.png'
import mission9 from './../images/mission9.png'
import mission10 from './../images/mission10.png'
import './Gallery.css'; // Import your CSS file

const Gallery = () => {
  return (
    <div className="gallery">
      {/* Replace src values with your image URLs */}
      <div className='mission-container' style={{borderRadius:'10px 0px 0px 10px'}}>
        <img src={mission1} alt='' />
        <div className='overlay'>
          <h3>Parenting 101</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission2} alt='' />
        <div className='overlay'>
          <h3>Doting Dad</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission3} alt='' />
        <div className='overlay'>
          <h3>Pack Man</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission4} alt='' />
        <div className='overlay'>
          <h3>Predator</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission5} alt='' />
        <div className='overlay'>
          <h3>Father Son</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission6} alt='' />
        <div className='overlay'>
          <h3>Wrap Up</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission7} alt='' />
        <div className='overlay'>
          <h3>Paleto Score</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission8} alt='' />
        <div className='overlay'>
          <h3>Killing Michael</h3>
        </div>
      </div>
      <div className='mission-container'>
        <img src={mission9} alt='' />
        <div className='overlay'>
          <h3>Minor Turbulence</h3>
        </div>
      </div>      
      <div className='mission-container' style={{borderRadius:'0px 10px 10px 0px'}}>
        <img src={mission10} alt='' />
        <div className='overlay'>
          <h3>Daddy's Little Girl</h3>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
