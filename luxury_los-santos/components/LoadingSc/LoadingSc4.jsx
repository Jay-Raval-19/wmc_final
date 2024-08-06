import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading4 from './../../images/loadingsc4.png';

const LoadingSc4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000); // Adjust time as needed
  }, [navigate]);

  return (
    <div className="loading-screen">
      <img src={loading4} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Loading1" />
    </div>
  );
}

export default LoadingSc4;
