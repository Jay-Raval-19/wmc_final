import React from 'react';
import './App.css';
import Navbar from './components/assets/navbar/Navbar';
import Footer from './components/assets/footer/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ShopCategory from './pages/ShopCategory';
import Cart from './pages/Cart';
// import Product from './pages/Product';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Shop from './pages/Shop'
import Signup from './pages/Signup';
import Loading1 from './components/LoadingSc/LoadingSc1'
import Loading2 from './components/LoadingSc/LoadingSc2'
import Loading3 from './components/LoadingSc/LoadingSc3'
import Loading4 from './components/LoadingSc/LoadingSc4'
import { DataProvider } from './DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Car from './pages/Car';
import Yacht from './pages/Yacht';
import Plane from './pages/Plane';
import Penthouse from './pages/Penthouse';
import ViewAllProducts from './pages/ViewAllProducts';
import UploadProduct from './pages/UploadProduct';
import Payments from './pages/Payments';
import Cheatcodes from './pages/Cheatcodes';
import { RouteSharp } from '@mui/icons-material';
function App() {
  return (
    <DataProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/car/:productName' element={<Car />} />
          <Route path='/yacht/:productName' element={<Yacht />} />
          <Route path='/plane/:productName' element={<Plane />} />
          <Route path='/penthouse/:productName' element={<Penthouse />} />
          {/* <Route path='/product/:productName' element={<Product />} /> */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/allproducts' element={<ViewAllProducts/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload-product' element={<UploadProduct />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/loading1' element={<Loading1 />} />
          <Route path='/loading2' element={<Loading2 />} />
          <Route path='/loading3' element={<Loading3 />} />
          <Route path='/loading4' element={<Loading4 />} />
          <Route path='/payments' element={<Payments/>}/>
          <Route path='/cheatcodes' element={<Cheatcodes/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    </DataProvider>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !=='/loading1' && location.pathname !=='/loading2' && location.pathname !=='/loading3' && location.pathname !=='/loading4';

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <div className={location.pathname === '/signup' || location.pathname === '/login' ? 'fullscreen' : ''}>
        {children}
      </div>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
