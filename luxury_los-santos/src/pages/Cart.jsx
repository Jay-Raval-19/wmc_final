import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Cart.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { auth } from '../firebaseconfig';
import cartbg from './../images/cartbg.jpg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ScrollToTop from './ScrollToTop';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItems, setDeletedItems] = useState([]);
  const [iconColor, setIconColor] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [totalWithTax, setTotalWithTax] = useState(0);
  
  const user = auth.currentUser;
  // Function to calculate subtotal
  const calculateSubtotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.Price.replace(/[$,]/g, ''));
      total += price;
    });
    return total.toFixed(2);
  };
  const handleGetCart = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    try {
      const response = await fetch(`https://luxury-los-santos-backend.onrender.com/get-cart?userId=${encodeURIComponent(user.email)}`);
      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
          setCartItems(data);
          const total = calculateSubtotal();
          setSubtotal(total);
          const tax = 0.18;
          setTotalWithTax((parseFloat(total) + parseFloat(total) * tax).toFixed(2));
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
  useEffect(() => {
    handleGetCart();
  }, [user]);
  useEffect(() => {
    setSubtotal(calculateSubtotal());
    const tax = 0.18;
    setTotalWithTax((parseFloat(subtotal) + parseFloat(subtotal) * tax).toFixed(2));
  }, [cartItems, subtotal]);
  const handleDeleteItem = async (itemId) => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    try {
      const response = await fetch('https://luxury-los-santos-backend.onrender.com/remove-item-from-cart', {
        method: 'DELETE',
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
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        setDeletedItems((prevDeleted) => [...prevDeleted, itemId]);
      } else {
        setError(data.message || 'Failed to delete item.');
      }
    } catch (error) {
      setError('Error deleting item.');
      console.error('Error:', error);
    }
  };
   const navitopay = () => {
    navigate('/payments');
  };
  const handleApplyCoupon = () => {
    const validCheatCodes = ['CHEAT20','BUZZOFF'];

    if (validCheatCodes.includes(couponCode.toUpperCase())) {
      const discount = 0.20; // 20%
      const discountedTotal = (parseFloat(totalWithTax) * (1 - discount)).toFixed(2);
      setTotalWithTax(discountedTotal);
      setMessage('Coupon applied! 20% discount applied to your total.');
    } else {
      setMessage('Invalid coupon code.');
    }
  };
  if (error) {
    return <div>Error: {error}</div>;
  }
 return (
    <div className="cartpage">
      <ScrollToTop/>
      <h2 className='superman'>Cart<ShoppingCartOutlinedIcon style={{fontSize:'30px'}}/></h2>
      {cartItems.length === 0 ? (
        <p className='cart-item' style={{color:'white', fontSize:'20px', textAlign:'center'}}>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-header">
              <div>Product</div>
              <div>Category</div>
              <div>Seller</div>
              <div>Price</div>
              <div>Remove</div>
            </div>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-details">
                  <img src={item.imageUrl1 || 'placeholder.jpg'} alt={item.Name || 'No Name'} />
                  <h3>{item.Name || 'No Name'}</h3>
                </div>
                <div className="item-category">{item.Category || 'N/A'}</div>
                <div className="item-seller">{item.Seller}</div>
                <div className="item-price">{item.Price}</div>
                <div className="deltbtn" onClick={() => handleDeleteItem(item._id)}>
                  <DeleteOutlinedIcon style={{ color: iconColor[item._id] || '#000', fontSize: '25px' }} />
                </div>
              </div>
            ))}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
              <p style={{color: 'white', fontWeight: 'bold',marginLeft:'20px'}}>{message}</p>
            </div>
            <div className="cart-total">
              <h3>Cart Summary</h3>
              <div>Subtotal: ${subtotal}</div>
              <div>Shipping: Free</div>
              <div>Total with Tax: ${totalWithTax}</div>
              <button onClick={navitopay}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
