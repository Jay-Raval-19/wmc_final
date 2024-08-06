import React, { useState, useEffect, useRef } from 'react';
import '../pages/Home.css';
import pic from '../images/gtachar.jpg';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ScrollToTopButton from './ScrollToTop';
import GalleryMissions from './Gallery';
import VideoComp from './VideoComp';
const Home = () => {
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    setActiveRow('row2');
  }, []);
  const handleRowClick = (row) => {
    setActiveRow(row);
  };

  const getBackgroundColor = (row) => {
    return activeRow === row ? '#DB4444' : '#000';
  };

  const getTextColor = (row) => {
    return activeRow === row ? '#000' : '#FFF';
  };

  const getDotBorderColor = (row) => {
    return activeRow === row ? 'rgba(125, 129, 132, 0.5)' : '#7D8184';
  };

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className='body'>
      <ScrollToTopButton />
      <div className='intro'>
        <div className='txt'>
          <div className='title'>
            <h1 style={{ fontSize: '50px' }}>Luxury Los-Santos</h1>
          </div>
          <p>
            Launched in 2024, Luxury Los-Santos is the premier online marketplace in Los Santos, brought to you by Atomic Motors and Wolfs International Realty. Supported by a wide range of tailored marketing, data, and service solutions, Luxury Los-Santos hosts 10,500 sellers and 300 brands, serving 3 million customers across the city.
          </p>
          <p>
            With over 1 million products, Luxury Los-Santos is your ultimate GTA V-themed marketplace, expanding rapidly to meet your needs. And for the keen-eyed shoppers, you might just find some exclusive in-game Easter eggs hidden in our listings. Happy shopping!
          </p>
        </div>
        <div className='photo'>
          <img src={pic} className='img_char' alt="GTA Character" />
        </div>
      </div>
      <div className='column'>
        <div
          className='row'
          style={{ backgroundColor: getBackgroundColor('row1'), color: getTextColor('row1') }}
          onClick={() => handleRowClick('row1')}
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <div
            className='dot'
            style={{
              borderColor: getDotBorderColor('row1'),
              borderStyle: 'solid',
              borderWidth: '10px'
            }}
          >
            <StorefrontOutlinedIcon sx={{ fontSize: 40 }} />
          </div>
          <div className='stat'>
            <h2>10.5k</h2>
            <h5>Active Sellers</h5>
          </div>
        </div>
        <div
          className='row'
          style={{ backgroundColor: getBackgroundColor('row2'), color: getTextColor('row2') }}
          onClick={() => handleRowClick('row2')}
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <div
            className='dot'
            style={{
              borderColor: getDotBorderColor('row2'),
              borderStyle: 'solid',
              borderWidth: '10px'
            }}
          >
            <CurrencyExchangeIcon sx={{ fontSize: 40 }} />
          </div>
          <div className='stat'>
            <h2>33k</h2>
            <h5>Monthly Sales</h5>
          </div>
        </div>
        <div
          className='row'
          style={{ backgroundColor: getBackgroundColor('row3'), color: getTextColor('row3') }}
          onClick={() => handleRowClick('row3')}
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <div
            className='dot'
            style={{
              borderColor: getDotBorderColor('row3'),
              borderStyle: 'solid',
              borderWidth: '10px'
            }}
          >
            <ShoppingBagTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
          <div className='stat'>
            <h2>45.5k</h2>
            <h5>Active Customers</h5>
          </div>
        </div>
        <div
          className='row'
          style={{ backgroundColor: getBackgroundColor('row4'), color: getTextColor('row4') }}
          onClick={() => handleRowClick('row4')}
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          <div
            className='dot'
            style={{
              borderColor: getDotBorderColor('row4'),
              borderStyle: 'solid',
              borderWidth: '10px'
            }}
          >
            <PaidTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
          <div className='stat'>
            <h2>25k</h2>
            <h5>Annual Gross Sale</h5>
          </div>
        </div>
      </div>
      <h1 style={{marginTop:'150px', fontSize:'50px'}}>Featured Missions</h1>
      <GalleryMissions/>
      <h1 style={{marginTop:'15vh', fontSize:'50px'}}>Experience The Thrill</h1>
      <VideoComp/>
      <h1 style={{marginTop:'150px', fontSize:'50px'}}>Meet The Dev's</h1>
      <div className='team'>
        <div className='prof' ref={(el) => (sectionRefs.current[4] = el)}>
          <div className='people'>
            <img src='https://www.viewbug.com/media/mediafiles/2018/01/18/77052177_large.jpg' alt="Jay Raval" />
          </div>
          <div className='about'>
            <h1>Jay Raval</h1>
            <h3>Junior @ AU</h3>
          </div>
          <div className='socials'>
            <a href="https://github.com/Jay-Raval-19" target="_blank" rel="noopener noreferrer">
              <GitHubIcon sx={{ fontSize: 30 }} />
            </a>
            <a href="https://www.instagram.com/jayraval_5181/#" target="_blank" rel="noopener noreferrer">
              <InstagramIcon sx={{ fontSize: 30 }} />
            </a>
            <a href="https://www.linkedin.com/in/jay-raval007/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon sx={{ fontSize: 30 }} />
            </a>
          </div>
        </div>
        <div className='prof' ref={(el) => (sectionRefs.current[5] = el)}>
          <div className='people'>
            <img src='https://www.viewbug.com/media/mediafiles/2018/01/18/77052177_large.jpg' alt="Jinil Savaj" />
          </div>
          <div className='about'>
            <h1>Jinil Savaj</h1>
            <h3>Junior @ AU</h3>
          </div>
          <div className='socials'>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{ fontSize: 30 }} />
          </a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{ fontSize: 30 }} />
          </a>
          </div>
        </div>
      </div>
      <div id="cards">
        <div className="card" ref={(el) => (sectionRefs.current[6] = el)}>
          <div className="card-content">
            <div className='plas'>
              <ElectricBoltIcon/>
            </div>
            <div className='promise'>
              <h3>Free And Fast Delivery</h3>
              <h5>Free delivery for all orders over $10000</h5>
            </div>
          </div>
        </div>
        <div className="card" ref={(el) => (sectionRefs.current[7] = el)}>
          <div className="card-content">
            <div className='plas'>
              <HeadsetMicIcon/>
            </div>
            <div className='promise'>
              <h3>24/7 Customer Service</h3>
              <h5>Friendly 24/7 customer service</h5>
            </div>        
          </div>
        </div>
        <div className="card" ref={(el) => (sectionRefs.current[8] = el)}>
        <div className="card-content">
            <div className='plas'>
              <VerifiedUserIcon/>
            </div>
            <div className='promise'>
              <h3>Money Back Guarantee</h3>
              <h5>30 days money back guarantee</h5>
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
