import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/login",
        formData
      );

      // Save user
      login({
        token: res.data.token,
        ...res.data.user,
      });

      // Redirect
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="min-h-[85vh] flex items-center justify-center px-6">

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-2xl w-full max-w-md"
        >

          <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome Back
          </h1>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-zinc-400">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-zinc-400">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Register Redirect */}
          <p className="text-zinc-400 text-center mt-6">
            Don’t have an account?{" "}

            <Link
              to="/register"
              className="text-white hover:underline"
            >
              Register
            </Link>
          </p>

        </form>

      </div>

    </MainLayout>
  );
}

export default Login;