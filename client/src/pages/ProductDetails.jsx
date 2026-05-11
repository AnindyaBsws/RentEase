import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";

import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Calculate Days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);

    const end = new Date(endDate);

    const diff =
      (end - start) / (1000 * 60 * 60 * 24);

    return diff + 1;
  };

  const totalDays = calculateDays();

  const totalPrice =
    totalDays * (product?.rentPerDay || 0);

  // Booking
  const handleBooking = async () => {
    try {
      setBookingLoading(true);

      await API.post(
        "/rentals",
        {
          productId: id,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Product Booked Successfully 🔥");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-3xl"
            />
          </div>

          {/* Content */}
          <div>

            <p className="text-zinc-500 mb-3">
              {product.category}
            </p>

            <h1 className="text-6xl font-bold mb-6">
              {product.title}
            </h1>

            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-10">

              <p className="text-zinc-500 mb-2">
                Rent Per Day
              </p>

              <h2 className="text-5xl font-bold">
                ₹{product.rentPerDay}
              </h2>

            </div>

            {/* Booking Box */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-3xl font-bold mb-6">
                Book This Product
              </h3>

              {/* Start Date */}
              <div className="mb-5">

                <label className="block mb-2 text-zinc-400">
                  Start Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                />

              </div>

              {/* End Date */}
              <div className="mb-6">

                <label className="block mb-2 text-zinc-400">
                  End Date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                />

              </div>

              {/* Pricing */}
              <div className="mb-6">

                <div className="flex items-center justify-between mb-3">
                  <p className="text-zinc-400">
                    Total Days
                  </p>

                  <p className="font-semibold">
                    {totalDays}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-zinc-400">
                    Total Price
                  </p>

                  <p className="text-2xl font-bold">
                    ₹{totalPrice}
                  </p>
                </div>

              </div>

              {/* Button */}
              <button
                onClick={handleBooking}
                disabled={
                  !startDate ||
                  !endDate ||
                  bookingLoading
                }
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition disabled:opacity-50"
              >
                {bookingLoading
                  ? "Booking..."
                  : "Book Now"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ProductDetails;