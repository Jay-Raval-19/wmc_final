import React, { useContext, useEffect, useState,useRef } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { auth, provider, prov } from './../firebaseconfig';
import useMeasure from "react-use-measure";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ScrollToTopButton from './ScrollToTop';
import './Shop.css';
import { DataContext } from './../DataContext';
import s1 from './../images/slide1.png';
import s2 from './../images/slide2.png';
import s3 from './../images/slide3.png';
import s4 from './../images/slide4.png';
import s5 from './../images/slide5.png';
import star from './../images/star.svg';
import Button from '@mui/material/Button';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './../images/carlog.svg';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import SailingIcon from '@mui/icons-material/Sailing';
import FlightIcon from '@mui/icons-material/Flight';
import VillaIcon from '@mui/icons-material/Villa';
import l from './../images/leftmove.svg';
import r from './../images/rightmove.svg';
import Slider from 'react-slick';
import gc from './../images/gamecontroller.png'
import upa from './../images/UpArrow.svg';
import { ArrowUpward } from '@mui/icons-material';
import axios from 'axios';


const Shop = () => {
  const navigate = useNavigate();
  const images = [s1, s2, s3, s4, s5];
  const data = useContext(DataContext);
  const [inficar, setInficar] = useState([]);
  const FAST_DURATION = 45;
  const SLOW_DURATION = 85;
  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [rerender, setRerender] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [email, setEmail] = useState('');
  const [activeRow, setActiveRow] = useState('yacht');
  const handleRowClick = (row) => {
    setActiveRow(row);
    fetchCategoryData(row);
  };

  const bgcl = 'linear-gradient(to bottom, #D93F21 0%, #882715 100%, #732111 100%)';
  const getBackground = (row) => {
    return activeRow === row ? bgcl : '#000';
  };
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || '');
    }
  }, []);


//   const handleAddToCart = async (event, item) => {
//     event.stopPropagation();

//     try {
//         console.log("ID=",item._id);
//         const response = await axios.post('http://localhost:3000/add-to-cart', { userId: user,mai, itemId: item._id });
//         if (response.status === 200) {
//             setCartCount(cartCount + 1);
//             console.log(cartCount);
//             alert('Item added to cart successfully');
//         }
//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//     }
// };

const handleAddToCart = async (event, item) => {
  event.stopPropagation();

  try {
      const user = auth.currentUser;
      console.log("ID=", item._id);
      const response = await axios.post('http://localhost:3000/add-to-cart', { userId: user.email, itemId: item._id });

      if (response.status === 200) {
          setCartCount(cartCount + 1);
          console.log(cartCount);
          alert('Item added to cart successfully');
      }
  } catch (error) {
      console.error('Error adding item to cart:', error);
  }
};
const handleAddToWishlist = async (event, item) => {
  event.stopPropagation();

  try {
      const user = auth.currentUser;
      console.log("ID=", item._id);
      const response = await axios.post('http://localhost:3000/add-to-wishlist', { userId: user.email, itemId: item._id });

      if (response.status === 200) {
          alert('Item added to Wishlist successfully');
      }
  } catch (error) {
      console.error('Error adding item to Wishlist:', error);
  }
};

  
  const BootstrapButton = styled(Button)({
    backgroundColor: '#DB4444',
    padding: '20px',
    fontSize: '18px',
    marginTop: '5vh',
    '&:hover': {
      backgroundColor: '#DB4444',
      borderColor: '#fff',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#005cbf',
    },
  });
  const [getran, SetGetRan] = useState([]);

  const getrandata = () => {
    if (data) {
      // Combine all categories into one array
      const allItems = [
        ...(Array.isArray(data.car) ? data.car : []),
        ...(Array.isArray(data.plane) ? data.plane : []),
        ...(Array.isArray(data.yacht) ? data.yacht : []),
        ...(Array.isArray(data.penthouse) ? data.penthouse : []),
      ];
  
      // Sort the combined array by Quantity in descending order and take the top 8 items
      const sortedData = allItems
        .sort((a, b) => b.Quantity - a.Quantity)
        .slice(0, 8)
        .map(item => ({
          _id: item._id,
          imageUrl1: item.imageUrl1,
          name: item.Name,
          price: item.Price,
          description: item.Description,
          category: item.Category,
          speed: item.Speed,
          acceleration:item.Acceleration,
          braking: item.Braking,
          traction: item.Traction,
          quantity: item.Quantity,
          agility:item.Agility,
          imageUrl2: item.imageUrl2,
          imageUrl3: item.imageUrl3,
          imageUrl4: item.imageUrl4,
          location: item.Location,
          seller: item.Seller,
          squarefeet: item.SquareFeet,
          link: item.Link,
          rooms:item.Rooms,
        }));
  
      SetGetRan(sortedData);
      console.log(sortedData);
    } else {
      console.error('Data is not available or not structured correctly:', data);
    }
  };
  const navitoall =()=>{
    navigate('/allproducts');
  }
  
  useEffect(() => {
    getrandata();
  }, [data]); // Add data to the dependency array to re-run when data changes
  
  
  const [catd, setCatd] = useState([]);
  const fetchCategoryData = (category) => {
    if (data && data[category]) {
      const catData = data[category].map(item => ({
        _id: item._id,
        imageUrl1: item.imageUrl1,
        name: item.Name,
        price: item.Price,
        description: item.Description,
        category: item.Category,
        speed: item.Speed,
        acceleration:item.Acceleration,
        braking: item.Braking,
        traction: item.Traction,
        quantity: item.Quantity,
        agility:item.Agility,
        imageUrl2: item.imageUrl2,
        imageUrl3: item.imageUrl3,
        imageUrl4: item.imageUrl4,
        location: item.Location,
        seller: item.Seller,
        squarefeet: item.SquareFeet,
        link: item.Link,
        rooms:item.Rooms,
      }));
      setCatd(catData);
      console.log(catData);
    }
  };

  useEffect(() => {
    fetchCategoryData('yacht'); // Fetch default category data on mount
  }, [data]);

  useEffect(() => {
    if (data && data.car) {
      const carData = data.car.slice(0, 14).map(item => ({
        _id: item._id,
        imageUrl1: item.imageUrl1,
        name: item.Name,
        price: item.Price,
        description: item.Description,
        category: item.Category,
        speed: item.Speed,
        acceleration:item.Acceleration,
        braking: item.Braking,
        traction: item.Traction,
        quantity: item.Quantity,
        agility:item.Agility,
        imageUrl2: item.imageUrl2,
        imageUrl3: item.imageUrl3,
        imageUrl4: item.imageUrl4,
        location: item.Location,
        seller: item.Seller,
        squarefeet: item.SquareFeet,
        link: item.Link,
        rooms:item.Rooms,
      }));
      setInficar(carData);
    }
  }, [data]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date('2024-08-08T22:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let controls;
    const finalPosition = -width * inficar.length;
    const loopDuration = duration * inficar.length;

    if (mustFinish) {
      const remainingDistance = finalPosition - xTranslation.get();
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: (loopDuration * remainingDistance) / finalPosition,
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: 'linear',
        duration: loopDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [xTranslation, width, duration, rerender, inficar.length]);

  const maddoxRef = useRef(null);
  const scrollToMaddox = () => {
    if (maddoxRef.current) {
      maddoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleListItemClick = (text) => {
    scrollToMaddox();
    if (text === 'Cars') {
      handleRowClick('car');
    }
    else if(text === 'Boats') {
      handleRowClick('yacht');
    }
    else if(text === 'Planes') {
      handleRowClick('plane');
    }
    else{
      handleRowClick('penthouse')
    }

  };

  const handleProductClick = (product) => {
    const productIdentifier = encodeURIComponent(product.Name);
    console.log(productIdentifier);
    if(product.category==="Car"){
      navigate(`/car/${productIdentifier}`, { state: { product } });
    }
    else if(product.category==="Yacht"){
      navigate(`/yacht/${productIdentifier}`, { state: { product } });
    }
    else if(product.category==="Plane"){
      navigate(`/plane/${productIdentifier}`, { state: { product } });
    }
    else if(product.category==="Penthouse"){
      navigate(`/penthouse/${productIdentifier}`,{state:{product}});
    }
    else{
      
    }
  };

  return (
    <div className='shoppage'>
      <ScrollToTopButton />
      <div className='catcar'>
        <div className='cate'>
          <ul>
            <li onClick={()=>handleListItemClick('Cars')}>Cars</li>
            <li onClick={()=>handleListItemClick('Boats')}>Yachts</li>
            <li onClick={()=>handleListItemClick('Planes')}>Planes</li>
            <li onClick={()=>handleListItemClick('Penthouse')}>Properties</li>
          </ul>
          <div className='vl'></div>
        </div>
        <div className='applecar'>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentImageIndex ? 'active' : ''}
            />
          ))}
          <div className='carousel-dots'>
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentImageIndex ? 'dottt active' : 'dottt'}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className='countdown-container'>
        <div className='countdown-header'>
          <div className='bann'>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className='countdown-title'>Popular&nbsp;&nbsp;&nbsp;Today</div>
        </div>
        <div id='countdown'>
          <ul>
            <li>
              Days<span id='days'>{String(countdown.days).padStart(2, '0')}</span>
            </li>
            <li>
              Hours<span id='hours'>{String(countdown.hours).padStart(2, '0')}</span>
            </li>
            <li>
              Minutes<span id='minutes'>{String(countdown.minutes).padStart(2, '0')}</span>
            </li>
            <li>
              Seconds<span id='seconds'>{String(countdown.seconds).padStart(2, '0')}</span>
            </li>
          </ul>
        </div>
      </div>
      <motion.div
        className='product-container'
        style={{ x: xTranslation }}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
        ref={ref}
      >
        {[...inficar, ...inficar].map((car, index) => (
          <div className='prodcard' key={car}>
            <div className='wishlistadd' onClick={(event)=>handleAddToWishlist(event,car)}>
              <FavoriteBorderOutlinedIcon style={{color:'#DB4444',width:'30px',alignSelf:'center',padding:'2px'}}/>
            </div>
            <div className='hjk' onClick={() => handleProductClick(car)}>
              <img src={car.imageUrl1} alt='car' />
              <div className='addcart' onClick={(event) => handleAddToCart(event, car)}>
                Add To Cart
              </div>
            </div>
            <div className='breifinfo' onClick={() => handleProductClick(car)}>
              <h4>{car.name}</h4>
              <h5>{car.price}</h5>
              <img src={star} alt='star' />
            </div>
          </div>
        ))}
      </motion.div>
      <BootstrapButton variant='contained' onClick={()=>navitoall()}>View All Products</BootstrapButton>
      <hr style={{ color: 'white', width: '80%', marginTop: '10vh' }} />
      <div className="maddox" ref={maddoxRef}>
        <div
          className="tundra"
          style={{ background: getBackground('car') }}
          onClick={() => handleRowClick('car')}
        >
          <DirectionsCarFilledIcon style={{ fontSize: '50px' }} />
          <h4>Cars</h4>
        </div>
        <div
          className="tundra"
          style={{ background: getBackground('yacht') }}
          onClick={() => handleRowClick('yacht')}
        >
          <SailingIcon style={{ fontSize: '50px' }} />
          <h4>Yacht's</h4>
        </div>
        <div
          className="tundra"
          style={{ background: getBackground('plane') }}
          onClick={() => handleRowClick('plane')}
        >
          <FlightIcon style={{ fontSize: '50px' }} />
          <h4>Planes</h4>
        </div>
        <div
          className="tundra"
          style={{ background: getBackground('penthouse') }}
          onClick={() => handleRowClick('penthouse')}
        >
          <VillaIcon style={{ fontSize: '50px' }} />
          <h4>Properties</h4>
        </div>
    </div>
    {/* <div className="arrow">
          <img src={l}/>
          <img src={r}/>
    </div> */}
    <div className="catfil">
  <Slider
    dots={false}
    infinite={false}
    speed={500}
    slidesToShow={4}
    slidesToScroll={4}
    nextArrow={<img src={r} alt="Next" />}
    prevArrow={<img src={l} alt="Previous" />}
  >
    {catd.length > 0 ? (
      catd.map((cag, index) => (
        <div key={cag.Name} className="prodcardd" onClick={() => handleProductClick(cag)}>
          <div className='wishlistaddd' onClick={(event)=>handleAddToWishlist(event,cag)}>
            <FavoriteBorderOutlinedIcon style={{ color: '#DB4444', width: '30px', alignSelf: 'center', padding: '2px',visibility:'visible' }} />
          </div>
          <div className='hjkl'>
            <img src={cag.imageUrl1} alt='catf' />
            <div className='addtocartb' onClick={(event) => handleAddToCart(event, cag)}>
              Add To Cart
            </div>
          </div>
          <div className='bfo'>
            <h4>{cag.name}</h4>
            <h5>{cag.price}</h5>
            <img src={star} alt='star' />
          </div>
        </div>
      ))
    ) : (
      <p>No items available</p>
    )}
  </Slider>
</div>
    <div className='coolimg'>
      <div className='tgh'>
        <h4>Feeling Stuck ?</h4>
        <h1>Enhance Your</h1>
        <h1>Ingame Experience</h1>
        <div className='buynowbtn'>Buy Now !</div>
      </div>
      <img src={gc}/>
    </div>
    <div className='restp'>
      <div classname='final'>
        <div className='bannn'>&nbsp;&nbsp;</div>
        <h3>Explore More</h3>
      </div>
      <div className="product-grid">
      {getran.map((item, index) => (
        <div key={item.Name} className='product-card'>
          <div className='wishlist-icon' onClick={(event)=>handleAddToWishlist(event,item)}>
            <FavoriteBorderOutlinedIcon style={{ color: '#DB4444', width: '30px', alignSelf: 'center', padding: '2px',visibility:'visible' }}/>
          </div>
          <div className='image-container'onClick={() => handleProductClick(item)}>
            <img src={item.imageUrl1} alt='product' />
            <div className='cart-button' onClick={(event) => handleAddToCart(event, item)}>
              Add To Cart
            </div>
          </div>
          <div className='product-info' onClick={() => handleProductClick(item)}>
            <h4>{item.name}</h4>
            <h5>{item.price}</h5>
            <img src={star}/>
          </div>
        </div>
      ))}
    </div>
    </div>
    <BootstrapButton variant='contained' onClick={()=>navitoall()}>View All Products</BootstrapButton>x
      </div>
  );
};

export default Shop;
