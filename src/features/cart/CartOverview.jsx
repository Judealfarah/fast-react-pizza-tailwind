import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-slate-600 text-slate-200 uppercase p-4 flex items-center justify-between">
      <p className="font-semibold text-slate-300 space-x-4">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart" className="hover:underline">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
