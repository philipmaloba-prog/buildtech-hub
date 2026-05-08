import './App.css';
import Navbar from './components/Navbar';
import GetProducts from './components/GetProducts';
import Cart from './components/Cart';
import MpesaPayment from './components/MpesaPayment';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import AddProducts from './components/AddProducts';
import ProductDetails from './components/ProductDetails';
import OrderHistory from './components/OrderHistory';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationToasts from './components/NotificationToasts';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';

function App() {
  return (
    <CartProvider>
      <NotificationProvider>
        <InnerApp />
      </NotificationProvider>
    </CartProvider>
  );
}

function InnerApp() {
  const { showPayment } = useCart();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('kitplug-dark-mode') === 'true');

  useEffect(() => {
    localStorage.setItem('kitplug-dark-mode', String(darkMode));
  }, [darkMode]);

  return (
    <>
      <BrowserRouter>
        <div className={`App app-shell ${darkMode ? 'dark-mode' : ''}`}>
          <header className="App-header sports-header">
            <img src="/kitplug-logo.jpg" alt="KITPLUG logo" className="top-left-logo" />
            <h1 className='display-3 p-2 text-center fw-bold text-light sports-title'>KITPLUG<span className="text-success"> Sports</span></h1>
          </header>
          <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
          <Routes>
            <Route path="/" element={<GetProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {showPayment && (
              <Route path="/mpesapayment" element={<MpesaPayment />} />
            )}
            <Route path="/addproduct" element={<AddProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </div>
        <NotificationToasts />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
