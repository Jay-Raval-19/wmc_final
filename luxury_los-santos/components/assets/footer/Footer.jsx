import React, { useState } from 'react';
// import { FaLocationArrow, FaMobileAlt, FaEnvelope } from 'react-icons/fa'; // Import icons as needed
// import Payment from './payment.png'; // Replace with actual path to your payment image
import './Footer.css'; // Import your CSS file
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">Exclusive</div>
          <div className="text">
            Subscribe
          </div>
          <div className='text'>Get 10% off your first order</div>
          <div className='mail'>
            <input placeholder='Enter your Email' className='maillet'/>
            <SendIcon/>
          </div>
        </div>
        <div className="col">
          <div className="title">Support</div>
          <div className="text">11 Mg Road,</div>
          <div className="text">New Delhi 38007,</div>
          <div className="text">India</div>
          <div className="text">example.gmail.com</div>
          <div className="text">+91 99092 - 99092</div>
        </div>

        <div className="col">
          <div className="title">Account</div>
          <div className="text">
            <Link to='/profile' style={{color:'white', textDecoration:'none'}}>My Account</Link>  
          </div>
          <div className="text">
            <Link to='/loginsignup' style={{color:'white', textDecoration:'none'}}>Login / Register</Link>  
          </div>
          <div className="text">
            <Link to='/cart' style={{color:'white', textDecoration:'none'}}>Cart</Link>  
          </div>
          <div className="text">
            <Link to='/wishlist' style={{color:'white', textDecoration:'none'}}>Wishlist</Link>  
          </div>
          <div className="text">
            <Link to='/shop' style={{color:'white', textDecoration:'none'}}>Shop</Link>  
          </div>

        </div>

        <div className="col">
          <div className="title">Categories</div>
          <div className="text">Cars</div>
          <div className="text">Boats</div>
          <div className="text">Planes</div>
          <div className="text">Properties</div>
        </div>

        <div className="col">
          <div className="title">Pages</div>
          <div className='wrapp'>
            <div className='socials'>
              <GitHubIcon/>
              <InstagramIcon/>
              <LinkedInIcon/>
            </div>
            </div>
        </div>
      </div>
      <hr style={{width:'100%',color:'white',marginBottom:'-10px'}}/>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="text">
            Luxury Los-Santos 2024 CREATED BY Jay Raval Jinil Savaj For WMC
          </div>
          {/* <img src={Payment} alt="Payment methods" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
