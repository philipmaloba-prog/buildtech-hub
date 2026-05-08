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
import ChatBot from "./components/ChatBot";
import Privacy from './pages/Privacy';
import About from './pages/About';
import Terms from './pages/Terms';
import Delivery from './pages/Delivery';
import MpesaSecure from './pages/MpesaSecure';

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

  useCart();

  const [products, setProducts] = useState([]);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('buildtech-dark-mode') === 'true'
  );

  useEffect(() => {
    fetch("https://philipswala.alwaysdata.net/api/get_product_details")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setProducts(data);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <BrowserRouter>

      <div className={`App app-shell ${darkMode ? 'dark-mode' : ''}`}>

        {/* HERO SECTION */}
        <div className="hero">

          {/* BACKGROUND VIDEO */}
          <video autoPlay muted loop playsInline className="bg-video">
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* DARK OVERLAY */}
          <div className="overlay"></div>

          {/* CONTENT */}
          <div className="hero-content">

            {/* HEADER */}
            <header className="App-header glass text-center">
              <h1 className="display-3 p-2 fw-bold text-light">
                BuildTech<span className="text-success">Hub</span>
              </h1>
            </header>

            {/* NAVBAR */}
            <Navbar
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((prev) => !prev)}
            />

          </div>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<GetProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/mpesapayment" element={<MpesaPayment />} />
            <Route path="/addproduct" element={<AddProducts />} />
            <Route path="/admin" element={<AddProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/mpesa-secure" element={<MpesaSecure />} />
          </Routes>

        </div>

      </div>

      {/* GLOBAL COMPONENTS */}
      <NotificationToasts />
      <ChatBot products={products} />
      <Footer />

    </BrowserRouter>
  );
}

export default App;