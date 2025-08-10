import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { Link } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="text-center my-11 sm:my-16">
      <h1 className="text-xl font-semibold text-center m-6">
        The best pizza.
        <br />
        <span className="text-sky-500">Straight out of the oven, to you.</span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Link
          className="inline-block tracking-wide p-3 bg-sky-300 hover:text-slate-200 rounded-full uppercase hover:bg-sky-500 transition-colors"
          to="/menu"
        >
          Continue ordering, {username}
        </Link>
      )}
    </div>
  );
}

export default Home;
