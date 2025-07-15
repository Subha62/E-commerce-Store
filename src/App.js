import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products'; 
import ShippingAddress from './pages/ShippingAddress';
import Payment    from './pages/Payment';


function App() {
  return (
    <div>
      <div className='bg-slate-900'>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} /> 
        <Route path="/shipping" element={<ShippingAddress/>}/>
        <Route path="/payment"   element={<Payment/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
