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
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 50000, // 500 INR in paisa
          currency: 'INR',
        }),
      });

      const order = await response.json();
      console.log('Order:', order);

      const options = {
        key: 'rzp_test_DkU3XBbbLEmhQW', 
        amount: order.amount,
        currency: order.currency,
        name: 'Demo Shop',
        description: 'Test Payment',
        order_id: order.id,
        handler: (response) => {
          alert('Payment successful!');
          console.log(response);
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
    } catch (err) {
      console.error(err);
      alert('Payment failed!');
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
        <button onClick={handleGoBack} className="bg-gray-600 text-white p-2 rounded">
          Back to Shipping
        </button>
        <button onClick={handleProceedToPayment} className="bg-green-700 text-white p-2 rounded">
          Proceed with Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Payment = () => {
//   const [shippingInfo, setShippingInfo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedShipping = localStorage.getItem('shippingAddress');
//     if (savedShipping) {
//       setShippingInfo(JSON.parse(savedShipping));
//     }
//   }, []);

//   const handleGoBack = () => {
//     navigate('/shipping');
//   };

//   const handleProceedToPayment = async () => {
//     if (!shippingInfo) {
//       alert('Shipping information missing!');
//       return;
//     }

//     try {
//         const response = await fetch(
//         'https://shopping-cart-backend-4.onrender.com/create-order',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             amount: 50000, // amount in paisa (e.g., ₹500)
//             currency: 'INR',
//           }),
//         }
//       );

//       const order = await response.json();
//       console.log('Order:', order);

//       if (!order.id) {
//         throw new Error('Failed to create order');
//       }

//       //  Razorpay options
//       const options = {
//         key: 'rzp_test_DkU3XBbbLEmhQW',
//         amount: order.amount,
//         currency: order.currency,
//         name: 'Shopping App',
//         description: 'Test Transaction',
//         order_id: order.id,
//         handler: function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           navigate('/payment-success');
//         },
//         prefill: {
//           name: shippingInfo.fullName,
//           email: 'customer@example.com',
//           contact: '9999999999',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (error) {
//       console.error(error);
//       alert('Payment failed to start');
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center">
//       <h1 className="text-2xl mb-4 font-bold">Payment Page</h1>

//       {shippingInfo ? (
//         <div className="mb-4 border p-4 rounded bg-gray-100 w-[300px]">
//           <h2 className="font-semibold mb-2">Shipping To:</h2>
//           <p>{shippingInfo.fullName}</p>
//           <p>{shippingInfo.address}</p>
//           <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
//           <p>{shippingInfo.country}</p>
//         </div>
//       ) : (
//         <p>No shipping address found. Please go back.</p>
//       )}

//       <div className="flex gap-4">
//         <button
//           onClick={handleGoBack}
//           className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//         >
//           Back to Shipping
//         </button>

//         <button
//           onClick={handleProceedToPayment}
//           className="bg-green-700 text-white p-2 rounded hover:bg-green-800"
//         >
//           Proceed with Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
