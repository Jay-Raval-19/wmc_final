import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import './Cart.css';
import './Wishlist.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { auth } from '../firebaseconfig';
import cartbg from './../images/cartbg.jpg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ScrollToTop from './ScrollToTop';
const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItems, setDeletedItems] = useState([]);
  const [iconColor, setIconColor] = useState({});
  const user = auth.currentUser;

  const handleGetWishlist = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/get-wishlist?userId=${encodeURIComponent(user.email)}`);
      const data = await response.json();

      if (response.ok) {
        // Ensure data is an array and not null
        if (Array.isArray(data)) {
          setWishItems(data);
        } else {
          setError('Unexpected data format.');
        }
      } else {
        setError(data.message || 'Failed to fetch cart data.');
      }
    } catch (error) {
      setError('Error fetching cart data.');
      console.error("Error:", error);
    }
  };
  const handleDeleteItem = async (itemId) => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/remove-item-from-wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.email,
          itemId: itemId,
        }),
      }
    );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted item from cartItems immediately
        setWishItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        // Optionally, update deleted items state or show a success message
        setDeletedItems((prevDeleted) => [...prevDeleted, itemId]);
      } else {
        setError(data.message || 'Failed to delete item.');
      }
    } catch (error) {
      setError('Error deleting item.');
      console.error('Error:', error);
    }
  };

  const handleMoveToCart = async (itemId) => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/move-wishlist-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.email,
          itemId: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        // Remove the moved item from wishlist items immediately
        setWishItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        setError(data.message || 'Failed to move item to cart.');
      }
    } catch (error) {
      setError('Error moving item to cart.');
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    handleGetWishlist();
  }, [user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cartpagee">
      <ScrollToTop/>
      <h2 className='supermann'>Wishlist<FavoriteBorderOutlinedIcon style={{fontSize:'30px',color:'#DB4444',fontWeight:'900'}}/></h2>
      {wishItems.length === 0 ? (
        <p className='cart-itemm'style={{color:'white',fontSize:'20px',textAlign:'center'}}>Your Wishlist is empty.</p>
      ) : (
        <>
          <div className="cart-itemss">
            <div className="cart-headerr">
              <div>Product</div>
              <div>Category</div>
              <div>Seller</div>
              <div>Price</div>
              <div>Remove</div>
              <div>Move to Cart</div>
            </div>
            {wishItems.map((item, index) => (
              <div className="cart-itemm" key={index}>
                <div className="item-detailss">
                  <img src={item.imageUrl1 || 'placeholder.jpg'} alt={item.Name || 'No Name'} />
                  <h3>{item.Name || 'No Name'}</h3>
                </div>
                <div className="item-categoryy">{item.Category || 'N/A'}</div>
                <div className="item-sellerr">
                  {item.Seller}
                </div>
                <div className="item-pricee">{item.Price}</div>
                <div className="deltbtnn" onClick={() => handleDeleteItem(item._id)}>
                  <DeleteOutlinedIcon style={{ color: iconColor[item._id] || '#000', fontSize: '25px' }} />
                </div>
                <div className="movtocrt" onClick={() => handleMoveToCart(item._id)}>
                  <ShoppingCartOutlinedIcon style={{color:'​#DCC338', fontSize:'25px'}}/>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Wishlist.propTypes = {
  // Removed userId prop since it's not needed
};

export default Wishlist;
