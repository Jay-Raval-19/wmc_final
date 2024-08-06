import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './../DataContext';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import star from './../images/star.svg';
import './ViewAllProducts.css';
import ScrollToTopButton from './ScrollToTop';

const ViewAllProducts = () => {
  const navigate = useNavigate();
  const data = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [seller, setSeller] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const allProducts = [
      ...(Array.isArray(data.car) ? data.car : []),
      ...(Array.isArray(data.plane) ? data.plane : []),
      ...(Array.isArray(data.yacht) ? data.yacht : []),
      ...(Array.isArray(data.penthouse) ? data.penthouse : []),
    ];
    const sortedData = allProducts.map(item => ({
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
      agility: item.Agility,
      imageUrl2: item.imageUrl2,
      imageUrl3: item.imageUrl3,
      imageUrl4: item.imageUrl4,
      location: item.Location,
      seller: item.Seller,
      squarefeet: item.SquareFeet,
      link: item.Link,
      rooms: item.Rooms,
    }));
    setProducts(sortedData);
    setFilteredProducts(sortedData);
  }, [data]);

  useEffect(() => {
    filterProducts();
  }, [category, priceRange, seller, sortOrder]);

  const filterProducts = () => {
    let tempProducts = [...products]; // Clone products array for filtering

    // Log initial products
    console.log("All products:", tempProducts);

    if (category) {
      tempProducts = tempProducts.filter(product => product.category === category);
    }

    tempProducts = tempProducts.filter(product => {
      const price = parseInt(product.price.replace(/[$,]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (seller) {
      tempProducts = tempProducts.filter(product => product.seller === seller);
    }

    // Sort products based on the selected order
    if (sortOrder === 'lowToHigh') {
      tempProducts = tempProducts.sort((a, b) => 
        parseInt(a.price.replace(/[$,]/g, '')) - parseInt(b.price.replace(/[$,]/g, ''))
      );
    } else if (sortOrder === 'highToLow') {
      tempProducts = tempProducts.sort((a, b) => 
        parseInt(b.price.replace(/[$,]/g, '')) - parseInt(a.price.replace(/[$,]/g, ''))
      );
    }

    // Log filtered and sorted products
    console.log("Filtered products:", tempProducts);

    setFilteredProducts(tempProducts);
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);
  
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const handleSellerChange = (e) => setSeller(e.target.value);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    // Handle add to cart
  };

  const handleProductClick = (product) => {
    const productIdentifier = encodeURIComponent(product.name);
    console.log(productIdentifier);
    if (product.category === "Car") {
      navigate(`/car/${productIdentifier}`, { state: { product } });
    } else if (product.category === "Yacht") {
      navigate(`/yacht/${productIdentifier}`, { state: { product } });
    } else if (product.category === "Plane") {
      navigate(`/plane/${productIdentifier}`, { state: { product } });
    } else if (product.category === "Penthouse") {
      navigate(`/penthouse/${productIdentifier}`, { state: { product } });
    }
  };

  return (
    <div className='viewallp'>
      <ScrollToTopButton />
      <div className="filter-bar">
        <select value={category} onChange={handleCategoryChange} className='selcat'>
          <option value="">All Categories</option>
          <option value="Car">Car</option>
          <option value="Plane">Plane</option>
          <option value="Yacht">Yacht</option>
          <option value="Penthouse">Penthouse</option>
        </select>
        <select value={seller} onChange={handleSellerChange} className='selcat'>
          <option value="">All Sellers</option>
          {Array.from(new Set(products.map(product => product.seller))).map((seller, index) => (
            <option key={index} value={seller}>{seller}</option>
          ))}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='selcat'>
          <option value="default">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <div className='moneybar'>
          <input 
            type="range" 
            min="0" 
            max="3500000" 
            value={priceRange[1]} 
            onChange={handlePriceChange} 
            step="10000" 
            className="custom-slider"
          />
          <div>Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</div>
        </div>
      </div>

      <div className="product-grida">
        {filteredProducts.map((item) => (
          <div key={item.name} className='product-cardg'>
            <div className='wishlistt-iconn'>
              <FavoriteBorderOutlinedIcon style={{ color: '#DB4444', width: '30px', alignSelf: 'center', padding: '2px', visibility: 'visible' }} />
            </div>
            <div className='imagee-containerr' onClick={() => handleProductClick(item)}>
              <img src={item.imageUrl1} alt='product' />
              <div className='cartt-buttonn' onClick={(event) => handleAddToCart(event)}>
                Add To Cart
              </div>
            </div>
            <div className='productt-infoo' onClick={() => handleProductClick(item)}>
              <h4>{item.name}</h4>
              <h5>{item.price}</h5>
              <img src={star} alt="star" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllProducts;
