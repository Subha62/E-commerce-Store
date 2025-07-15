import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";

const savedCart = JSON.parse(localStorage.getItem("cart")) ?? [];

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: savedCart,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});
