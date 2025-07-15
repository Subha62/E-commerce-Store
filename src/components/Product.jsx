import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const Product = ({ post }) => {
  const cart = useSelector((state) => state.cart ?? []);
  const dispatch = useDispatch();

  const isInCart = Array.isArray(cart) && cart.some((p) => p.id === post.id);

  const addToCart = useCallback(() => {
    if (isInCart) {
      toast("Item already in cart!");
      return;
    }
    dispatch(add(post));
    toast.success("Item added to Cart");
  }, [dispatch, post, isInCart]);

  const removeFromCart = useCallback(() => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }, [dispatch, post]);

  const buttonClasses =
    "text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in";

  return (
    <div className="flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl shadow-lg shadow-blue-500/30">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
          {post.title}
        </p>
      </div>

      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>

      <div className="h-[180px] w-full flex items-center justify-center">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover rounded"
          loading="lazy"
        />
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <p className="text-green-600 font-semibold">
          ${Number(post.price).toFixed(2)}
        </p>

        {isInCart ? (
          <button className={buttonClasses} onClick={removeFromCart}>
            Remove Item
          </button>
        ) : (
          <button className={buttonClasses} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
