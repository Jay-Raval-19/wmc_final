import React, { useEffect, useState } from 'react';
import './About.css';
import pic1 from './../images/prestige.png';
import pic2 from './../images/sophs.jpg';
import pic3 from './../images/pic3.jpg';
import pic4 from './../images/opulence.jpg';
import pic5 from './../images/pic5.jpg';
import pic6 from './../images/pic6.png';
import pic7 from './../images/pic7.png';
import pic8 from './../images/pic8.png';

const About = () => {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage;

      track.style.transform = `translate(${nextPercentage}%, -50%)`;

      const images = track.querySelectorAll(".image");
      images.forEach(image => {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
      });
    }

    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('touchstart', e => handleOnDown(e.touches[0]));
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('touchend', e => handleOnUp(e.touches[0]));
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));

    return () => {
      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('touchstart', e => handleOnDown(e.touches[0]));
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('touchend', e => handleOnUp(e.touches[0]));
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchmove', e => handleOnMove(e.touches[0]));
    }
  }, []);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    const handleMouseOver = event => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
          event.target.innerText = event.target.dataset.value;
        }

        iteration += 1 / 3;
      }, 30);
    };

    const titles = document.querySelectorAll('.scramble-title');
    titles.forEach(title => {
      title.addEventListener('mouseover', handleMouseOver);
    });

    return () => {
      titles.forEach(title => {
        title.removeEventListener('mouseover', handleMouseOver);
      });
    };
  }, []);

  const handleClick = (index) => {
    setActiveImage(activeImage === index ? null : index);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className='aboutp' onClick={() => setActiveImage(null)}>
        <div className='ktitle'>
          <h1 className="scramble-title" data-value="Atomic" style={{ marginRight: '1vw', userSelect: 'none' }}>Atomic</h1>
          <h2 data-value="X" style={{ fontFamily: 'PP Neue Montreal', marginRight: '1vw', userSelect: 'none' }}>X</h2>
          <h1 className="scramble-title" data-value="Wolfs" style={{ userSelect: 'none' }}>Wolfs</h1>
        </div>
        <div className='headd'>
          <h2>Experience the Thrill of Los Santos</h2>
        </div>
        <div className='stylo'>
        <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
          {[pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8].map((pic, index) => (
            <img
              key={index}
              className={`image ${activeImage === index ? 'active' : activeImage !== null ? 'inactive' : ''}`}
              src={pic}
              draggable="false"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(index);
              }}
            />
          ))}
        </div>
        </div>
        <div className='icons'>
          <p>Click and Drag</p>
        </div>
      </div>
    </div>
  );
}

export default About;
