import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading3 from './../../images/loadingsc2.png';

const LoadingSc3 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/loading4');
    }, 2000); // Adjust time as needed
  }, [navigate]);

  return (
    <div className="loading-screen">
      <img src={loading3} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Loading3" />
    </div>
  );
}

export default LoadingSc3;
