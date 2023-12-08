import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/");
    }
  }
  return (
    <nav className="absolute z-50 flex w-full items-center justify-between p-4">
      <Link to="/">
        <span className="cursor-pointer font-nsans-bold text-3xl uppercase text-red-600 sm:text-5xl">
          netflix
        </span>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="pr-4 capitalize ">Profile</button>
          </Link>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded bg-red-600 px-6 py-2 pr-4 capitalize"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="pr-4 capitalize ">login</button>
          </Link>
          <Link to="/signup">
            <button className="cursor-pointer rounded bg-red-600 px-6 py-2 pr-4 capitalize">
              sign up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
