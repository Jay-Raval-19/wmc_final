import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DataContext } from './../DataContext';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import star from './../images/star.svg'; // Update the path if needed
import './Car.css';
import { styled } from '@mui/material/styles';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import speed from './../images/speed.svg';
import accleration from './../images/accleration.svg';
import braking from './../images/braking.svg';
import traction from './../images/traction.svg';
import { useNavigate } from 'react-router-dom';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import axios from 'axios';
import { auth } from '../firebaseconfig';
const Penthouse = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const [mainImage, setMainImage] = useState(product?.imageUrl1);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const data = useContext(DataContext);

  const [relatedItems, setRelatedItems] = useState([]);

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleIncrease = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  const BootstrapButton = styled(Button)({
    backgroundColor: '#DB4444',
    width: '150px',
    fontSize: '16px',
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

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    if(!isFavorited){
      console.log("Reaches Here:",product);
      handleAddToWishlist(product);
    }
  };

  const [getran, SetGetRan] = useState([]);

  const getrandata = () => {
    if (data) {
      // Filter items based on the current product category
      const filteredItems = [
        ...(Array.isArray(data.car) ? data.car : []),
        ...(Array.isArray(data.plane) ? data.plane : []),
        ...(Array.isArray(data.yacht) ? data.yacht : []),
        ...(Array.isArray(data.penthouse) ? data.penthouse : []),
      ].filter(item => item.Category === product.category);

      // Shuffle the filtered array and take 4 random items
      const shuffledData = filteredItems.sort(() => 0.5 - Math.random()).slice(0, 4).map(item => ({
        imageUrl1: item.imageUrl1,
        name: item.Name,
        price: item.Price,
        description: item.Description,
        category: item.Category,
        speed: item.Speed,
        acceleration: item.Acceleration,
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
      }));

      SetGetRan(shuffledData);
      console.log(shuffledData);
    } else {
      console.error('Data is not available or not structured correctly:', data);
    }
  };

  useEffect(() => {
    getrandata();
  }, [data, product.category]); // Add data and product.category to the dependency array to re-run when they change

  const handleProductClick = (product) => {
    const productIdentifier = encodeURIComponent(product.Name);
    if(product.category==="Car"){
      navigate(`/car/${productIdentifier}`, { state: { product } });
    }
    else if(product.category==="Yacht"){
      navigate(`/yacht/${productIdentifier}`, { state: { product } });
      window.scrollTo(0, 0);
      setMainImage(product.imageUrl1);
    }
    else if(product.category==="Plane"){
      navigate(`/plane/${productIdentifier}`, { state: { product } });
      window.scrollTo(0, 0);
      setMainImage(product.imageUrl1);

    }
    else if(product.category==="Penthouse"){
      navigate(`/penthouse/${productIdentifier}`,{state:{product}});
      window.scrollTo(0, 0);
      setMainImage(product.imageUrl1);
    }
    else{
      
    }
  };
  const handleAddToCart = async (item) => {
    try {
        const user = auth.currentUser;
        console.log("ID=", item._id);
        const response = await axios.post('http://localhost:3000/add-to-cart', { userId: user.email, itemId: item._id });
  
        if (response.status === 200) {
            alert('Item added to cart successfully');
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
  };
  const handleAddToWishlist = async (item) => {
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
  useEffect(() => {
    getrandata();
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, [data, product.category]); // Add data and product.category to the dependency array to re-run when they change


  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className='carproductpage'>
      <div className="prodinfoo">
        <div className="lkj">
          <div className='activeimg'>
            <img src={mainImage} key="main" alt="main product" className="mainImage"/>
          </div>
          <div className="leftrowp">
            <img src={product.imageUrl1} key="img1" alt="product" onClick={() => handleImageClick(product.imageUrl1)} />
            <img src={product.imageUrl2} key="img2" alt="product" onClick={() => handleImageClick(product.imageUrl2)} />
            <img src={product.imageUrl3} key="img3" alt="product" onClick={() => handleImageClick(product.imageUrl3)} />
            <img src={product.imageUrl4} key="img4" alt="product" onClick={() => handleImageClick(product.imageUrl4)} />
          </div>
        </div>
        <div className='pdesc'>
          <h1 style={{ fontWeight: '400' }}>{product.name}</h1>
          <div className="ratqty">
            <img src={star} alt="star" />
            <h3>Seller&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.seller}</h3>
          </div>
          <p>{product.description}</p>
          <div className='pricee' style={{ width: '80%', display: 'flex', justifyContent: "center", alignItems: 'center', color: 'green', marginBottom: "3vh" }}>
            Now Available At&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.price}
          </div>
          <div className="addpbtn">
            <div className="qty-container">
              <button className="qty-btn-minus btn-danger btn-cornered mr-1" type="button" onClick={handleDecrease}>
                <RemoveOutlinedIcon style={{ color: 'white' }} />
              </button>
              <input 
                type="text" 
                name="qty" 
                value={quantity} 
                className="input-qty input-cornered" 
                onChange={handleQuantityChange}
              />
              <button className="qty-btn-plus btn-danger btn-cornered ml-1" type="button" onClick={handleIncrease}>
                <AddOutlinedIcon style={{ color: 'white' }} />
              </button>
            </div>
            <BootstrapButton variant='contained' onClick={() => handleAddToCart(product)}>Buy Now</BootstrapButton>
            <div className='boxx' onClick={toggleFavorite} style={{ backgroundColor: isFavorited ? '#FFE3F6' : 'black' }}>
              <FavoriteBorderOutlinedIcon style={{ color: isFavorited ? '#FB09B0' : 'white' }} />
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ color: 'white', marginTop: '10vh' }}>In-Game Stats</h1>
      <div className='gameinfo'>
        <div className='detol'>
          <div className='kll'>
            <BusinessCenterOutlinedIcon style={{color:'white',fontSize:'30px',paddingRight:'8px'}}/>
            <h4>Seller</h4>
          </div>
          <h4>{product.seller}</h4>
        </div>

        <div className='detol'>
          <div className='kll'>
            <LocationOnOutlinedIcon style={{color:'white',fontSize:'30px',paddingRight:'8px'}}/>
            <h4>Location</h4>
          </div>
          <h4>{product.location}</h4>
        </div>

        <div className='detol'>
          <div className='kll'>
            <SquareFootOutlinedIcon style={{color:'white',fontSize:'30px',paddingRight:'8px'}}/>
            <h4>Square-Feet</h4>
          </div>
          <h4>{product.squarefeet}</h4>
        </div>

        <div className='detol'>
          <div className='kll'>
            <HomeWorkOutlinedIcon style={{color:'white',fontSize:'30px',paddingRight:'8px'}}/>
            <h4>Rooms</h4>
          </div>
          <h4>{product.rooms}</h4>
        </div>
      </div>
      <div className='endf'>
      <div className='banne'>&nbsp;</div>
      <h2 className='similartxt' style={{color:'white'}}>Similar Products</h2>
      </div>
      <div className='related-products-section'>
        <h2 className='similartxt'>Similar Products</h2>
        {getran.length > 0 ? (
          <div className="product-grid">
            {getran.map((item, index) => (
              <div key={item.name} className='product-card' onClick={() => handleProductClick(item)}>
                <div className='wishlist-icon'>
                  <FavoriteBorderOutlinedIcon style={{ color: '#DB4444', width: '30px', alignSelf: 'center', padding: '2px', visibility: 'visible' }} />
                </div>
                <div className='image-container'>
                  <img src={item.imageUrl1} alt='product' />
                  <div className='cart-button' onClick={handleAddToCart}>
                    Add To Cart
                  </div>
                </div>
                <div className='product-info'>
                  <h4>{item.name}</h4>
                  <h5>{item.price}</h5>
                  <img src={star} alt='star' />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default Penthouse;
