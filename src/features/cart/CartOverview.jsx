import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="bg-slate-600 text-slate-200 uppercase p-4 flex items-center justify-between">
      <p className="font-semibold text-slate-300 space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart" className="hover:underline">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
