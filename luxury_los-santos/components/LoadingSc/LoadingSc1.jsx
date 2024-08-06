import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading1 from './../../images/loadingsc3.jpg';

const LoadingSc1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/loading2');
    }, 2000); // Adjust time as needed
  }, [navigate]);

  return (
    <div className="loading-screen">
      <img src={loading1} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Loading1" />
    </div>
  );
}

export default LoadingSc1;
