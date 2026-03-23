import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [shippingInfo, setShippingInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedShipping = localStorage.getItem('shippingAddress');
    if (savedShipping) {
      setShippingInfo(JSON.parse(savedShipping));
    }
  }, []);

  const handleGoBack = () => {
    navigate('/shipping');
  };

  const handleProceedToPayment = async () => {
    if (!shippingInfo) {
      alert('Shipping info missing');
      return;
    }

    try {
      const response = await fetch(
        'https://shopping-cart-backend-4.onrender.com/create-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 50000,
            currency: 'INR',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Backend error');
      }

      const order = await response.json();

      if (!order.id) {
        throw new Error('Order creation failed');
      }

      const options = {
        key: 'rzp_test_SUW9sqwZMjTQgO',
        amount: order.amount,
        currency: order.currency,
        name: 'Demo Shop',
        description: 'Test Payment',
        order_id: order.id,
        handler: (response) => {
          alert('Payment successful!');
          navigate('/payment-success');
        },
        prefill: {
          name: shippingInfo.fullName,
          email: 'test@example.com',
          contact: '9999999999',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 font-bold">Payment Page</h1>

      {shippingInfo ? (
        <div className="mb-4 border p-4 rounded bg-gray-100 w-[300px]">
          <h2 className="font-semibold mb-2">Shipping To:</h2>
          <p>{shippingInfo.fullName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
          <p>{shippingInfo.country}</p>
        </div>
      ) : (
        <p>No shipping address found. Please go back.</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleGoBack}
          className="bg-gray-600 text-white p-2 rounded"
        >
          Back to Shipping
        </button>

        <button
          onClick={handleProceedToPayment}
          className="bg-green-700 text-white p-2 rounded"
        >
          Proceed with Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
