import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-sky-500 p-3 border-b-4 border-slate-700 flex items-center justify-between">
      <Link
        to="/"
        className="tracking-widest text-xl uppercase py-4 font-bold text-slate-300"
      >
        Fast React Pizza Co.
      </Link>
      <div className="space-y-2">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}

export default Header;
