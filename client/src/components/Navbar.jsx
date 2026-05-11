import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-white"
      >
        RentEase
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="text-zinc-300 hover:text-white transition"
        >
          Home
        </Link>

        {user && (
          <>
            <Link
              to="/dashboard"
              className="text-zinc-300 hover:text-white transition"
            >
              Dashboard
            </Link>

            <Link
              to="/my-rentals"
              className="text-zinc-300 hover:text-white transition"
            >
              My Rentals
            </Link>
          </>
        )}

      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            <p className="text-zinc-300">
              Hi, {user.name}
            </p>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-lg transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-zinc-200 transition"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;