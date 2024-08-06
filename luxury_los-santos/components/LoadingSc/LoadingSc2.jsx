import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading2 from './../../images/loadingsc1.jpg';

const LoadingSc2 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/loading3');
    }, 2000); // Adjust time as needed
  }, [navigate]);

  return (
    <div className="loading-screen">
      <img src={loading2} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Loading2" />
    </div>
  );
}

export default LoadingSc2;
