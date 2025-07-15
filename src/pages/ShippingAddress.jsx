import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    const shippingInfo = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };

    localStorage.setItem('shippingAddress', JSON.stringify(shippingInfo));

    navigate('/payment');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 font-bold">Shipping Address</h1>
      <form onSubmit={handleProceedToPayment} className="flex flex-col gap-4 w-[300px]">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-green-700 text-white p-2 rounded hover:bg-green-800"
        >
          Proceed to Payment
        </button>

        <button
          type="button"
          onClick={handleBackToCart}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Back to Cart
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
