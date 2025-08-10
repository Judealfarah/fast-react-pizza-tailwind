import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return <div className="block font-semibold text-slate-300">{username}</div>;
}

export default Username;
