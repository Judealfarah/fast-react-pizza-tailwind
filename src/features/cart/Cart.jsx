import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="hover:text-slate-900 hover:underline">
        &larr; Back to menu
      </Link>

      <h2 className="text-lg">Your cart, %NAME%</h2>

      <ul className="divide-y divide-slate-300 border-b mt-3 mb-6">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>
      <div className="space-x-2">
        <Link
          className="inline-block tracking-wide p-3 bg-sky-300 hover:text-slate-200 p-2 rounded-full uppercase hover:bg-sky-500 transition-colors"
          to="/order/new"
        >
          Order pizzas
        </Link>
        <Button>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
