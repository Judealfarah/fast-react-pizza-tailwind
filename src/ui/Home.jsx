import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center my-11 sm:my-16">
      <h1 className="text-xl font-semibold text-center m-6">
        The best pizza.
        <br />
        <span className="text-sky-500">Straight out of the oven, to you.</span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
