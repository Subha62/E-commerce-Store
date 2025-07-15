import React, { useMemo } from 'react';
import { useSelector } from "react-redux";
import CartItem from '../components/CartItem';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart ?? []);
  const navigate = useNavigate(); 

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div className="min-h-[80vh]">
      {cartItems.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-[60%] flex flex-col p-2">
            {cartItems.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          <div className="w-full md:w-[40%] mt-5 flex flex-col">
            <div className="flex flex-col p-5 gap-5 my-14 h-full justify-between">
              <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-xl text-green-800 uppercase">Your Cart</h2>
                <h3 className="font-semibold text-5xl text-green-700 -mt-5 uppercase">Summary</h3>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold">
                    Total Items: {cartItems.length}
                  </span>
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  <span className="text-gray-700 font-semibold">Total Amount:</span> ${totalAmount}
                </p>
                <button
                  onClick={handleCheckout} 
                  className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 mb-5 border-2 border-green-600 font-bold hover:text-green-700 p-2 text-xl w-3/4"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">Your Cart is Empty!</h1>
          <NavLink to="/">
            <button className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;



