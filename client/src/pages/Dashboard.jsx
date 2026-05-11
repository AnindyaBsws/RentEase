import { useState, useContext } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    rentPerDay: "",
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

      await API.post(
        "/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Product Added Successfully 🔥");

      // Reset Form
      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
        rentPerDay: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto px-8 py-16">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">
            Dashboard
          </h1>

          <p className="text-zinc-400 text-xl">
            Welcome back, {user?.name}
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl"
        >

          <h2 className="text-4xl font-bold mb-10">
            Add New Product
          </h2>

          {/* Title */}
          <div className="mb-6">

            <label className="block mb-2 text-zinc-400">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Modern Sofa"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 outline-none focus:border-white"
              required
            />

          </div>

          {/* Description */}
          <div className="mb-6">

            <label className="block mb-2 text-zinc-400">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Write product details..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 outline-none focus:border-white resize-none"
              required
            />

          </div>

          {/* Category */}
          <div className="mb-6">

            <label className="block mb-2 text-zinc-400">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Furniture"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 outline-none focus:border-white"
              required
            />

          </div>

          {/* Image */}
          <div className="mb-6">

            <label className="block mb-2 text-zinc-400">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 outline-none focus:border-white"
              required
            />

          </div>

          {/* Rent */}
          <div className="mb-10">

            <label className="block mb-2 text-zinc-400">
              Rent Per Day
            </label>

            <input
              type="number"
              name="rentPerDay"
              placeholder="500"
              value={formData.rentPerDay}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 outline-none focus:border-white"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl text-lg font-bold hover:bg-zinc-200 transition"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default Dashboard;