import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="hover:text-slate-900 hover:underline">
        &larr; Back to menu
      </Link>

      <h2 className="text-lg">Your cart, {username}</h2>

      <ul className="divide-y divide-slate-300 border-b mt-3 mb-6">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="space-x-2">
        <Link
          className="inline-block tracking-wide p-3 bg-sky-300 hover:text-slate-200 rounded-full uppercase hover:bg-sky-500 transition-colors"
          to="/order/new"
        >
          Order pizzas
        </Link>
        <Button onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
