import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center">
      <button
        className="inline-block tracking-wide py-1.5 px-3 bg-sky-400 hover:text-slate-200 rounded-full hover:bg-sky-500 transition-colors"
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </button>
      <span className="font-semibold">{currentQuantity}</span>
      <button
        className="inline-block tracking-wide py-1.5 px-3 bg-sky-400 hover:text-slate-200 rounded-full hover:bg-sky-500 transition-colors"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
