import React from 'react';
import clip1 from './../images/clip1.mp4';
import clip2 from './../images/clip2.mp4';
import clip3 from './../images/clip3.mp4';
import clip4 from './../images/clip4.mp4';
import './VideoComp.css'; // Import the CSS file

const VideoComp = () => {
  const clips = [clip1, clip2, clip3, clip4];

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
    event.target.currentTime = 0; // Reset the video to the start
  };

  return (
    <div className="gta_container">
      {clips.map((clip, index) => (
        <div key={index} className={`gta_card gta_card-${index}`}>
          <video
            src={clip}
            className="gta_video_element"
            muted
            loop
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoComp;
