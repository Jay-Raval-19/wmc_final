import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './../../../firebaseconfig';
import { DataContext } from './../../../DataContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [menu, setMenu] = useState('Home');
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const data = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const results = Object.values(data)
        .flat()
        .filter(item => item.Name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 4); // Limit to 4 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  const navitoall =()=>{
    navigate('/shop');
  }
  const handleProductClick = (product) => {
    const productIdentifier = encodeURIComponent(product.Name);
    const path = `/${product.Category.toLowerCase()}/${productIdentifier}`;
    navigate(path, { state: { product } });
  };

  return (
    <header className='header'>
      <div className='topline'>
        <p style={{ paddingLeft: '25vw' }}>
          Sale For All Properties And Free Reward on Purchase &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <u>
          <p onClick={()=>navitoall()}  style={{ textDecoration: 'none', color: '#000', paddingRight: '30vw' }}>
            ShopNow
          </p>
        </u>
      </div>
      <div className='navbar'>
        <h2 className='exclusive-text'>Exclusive</h2>
        <div className={`pages ${isMenuOpen ? 'open' : ''}`}>
          <ul className='u1'>
            <li onClick={() => { setMenu('Home'); toggleMenu(); }}>
              <Link to='/'>Home</Link>
              {menu === 'Home' && <hr style={{ color: '#fff' }} />}
            </li>
            <li onClick={() => { setMenu('Shop'); toggleMenu(); }}>
              <Link to='/shop'>Shop</Link>
              {menu === 'Shop' && <hr style={{ color: '#fff' }} />}
            </li>
            <li onClick={() => { setMenu('About'); toggleMenu(); }}>
              <Link to='/about'>About</Link>
              {menu === 'About' && <hr style={{ color: '#fff' }} />}
            </li>
            {user ? (
              <li onClick={() => { handleLogout(); toggleMenu(); }}>
                <a href='#'>Logout</a>
                {menu === 'Logout' && <hr style={{ color: '#fff' }} />}
              </li>
            ) : (
              <li onClick={() => { setMenu('Sign Up'); toggleMenu(); }}>
                <Link to='/signup'>Sign Up</Link>
                {menu === 'Sign Up' && <hr style={{ color: '#fff' }} />}
              </li>
            )}
          </ul>
        </div>
        <div className='wrapper'>
          <div className='search-cont'>
            <input
              type="text"
              style={{ borderWidth: '0' }}
              placeholder='What are you looking for?'
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <SearchIcon style={{ color: '#000' }} />
            {searchQuery && (
              <div className='search-results-dropdown'>
                {searchResults.map(item => (
                  <div
                    key={item.Name}
                    className='search-item'
                    onClick={() => handleProductClick(item)}
                  >
                    <img src={item.imageUrl1} alt={item.Name} className='search-item-image' />
                    <p className='search-item-name'>{item.Name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to='/wishlist' style={{ color: '#fff', paddingRight: '20px', paddingLeft: '20px' }}>
            <FavoriteBorderIcon />
          </Link>
          <Link to='/cart' style={{ color: '#fff', paddingRight: '20px' }}>
            <ShoppingCartOutlinedIcon />
          </Link>
          <Link to='/profile' style={{ color: '#fff', paddingRight: '20px' }}>
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/24'; }}
              />
            ) : (
              <Person2OutlinedIcon />
            )}
          </Link>
        </div>
        <div className='menu-icon' onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
