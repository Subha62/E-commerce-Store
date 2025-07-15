import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    if (!item?.id) {
      console.error("Invalid item: ", item);
      return;
    }

    dispatch(remove(item.id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="flex items-center justify-between p-2 md:p-5 mt-2 mb-2 md:mx-5 border-b-2">
      {/* Image */}
      <div className="w-[30%]">
        <img
          className="object-cover w-full h-full rounded"
          src={item.image}
          alt={item.title || "Cart item image"}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col md:ml-10 md:w-[70%] w-[65%] self-start space-y-5">
        <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
        <p className="text-base text-slate-700 font-medium">
          {item.description?.split(" ").slice(0, 10).join(" ") + "..."}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-bold text-lg text-green-600">
            ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
          </p>

          <button
            onClick={removeFromCart}
            className="text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 flex items-center justify-center"
            aria-label="Remove from cart"
          >
            <AiFillDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
