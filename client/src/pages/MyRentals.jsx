import { useEffect, useState, useContext } from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";

import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";

function MyRentals() {
  const { user } = useContext(AuthContext);

  const [rentals, setRentals] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Rentals
  const fetchRentals = async () => {
    try {
      const res = await API.get(
        "/rentals/my",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setRentals(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">
            My Rentals
          </h1>

          <p className="text-zinc-400 text-xl">
            Manage all your rented products
          </p>

        </div>

        {/* Loading */}
        {loading ? (
          <Loader />
        ) : rentals.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold mb-4">
              No Rentals Yet
            </h2>

            <p className="text-zinc-500">
              Start renting products today 🚀
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {rentals.map((rental) => (

              <div
                key={rental._id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
              >

                {/* Image */}
                <img
                  src={rental.product.image}
                  alt={rental.product.title}
                  className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-8">

                  <p className="text-zinc-500 mb-2">
                    {rental.product.category}
                  </p>

                  <h2 className="text-4xl font-bold mb-4">
                    {rental.product.title}
                  </h2>

                  <p className="text-zinc-400 mb-8">
                    {rental.product.description}
                  </p>

                  {/* Rental Details */}
                  <div className="space-y-4">

                    <div className="flex items-center justify-between">
                      <p className="text-zinc-500">
                        Start Date
                      </p>

                      <p className="font-semibold">
                        {formatDate(rental.startDate)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-zinc-500">
                        End Date
                      </p>

                      <p className="font-semibold">
                        {formatDate(rental.endDate)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-zinc-500">
                        Total Days
                      </p>

                      <p className="font-semibold">
                        {rental.totalDays}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-zinc-500">
                        Status
                      </p>

                      <p className="text-green-400 font-semibold">
                        {rental.status}
                      </p>
                    </div>

                  </div>

                  {/* Total Price */}
                  <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">

                    <p className="text-zinc-500">
                      Total Price
                    </p>

                    <h3 className="text-3xl font-bold">
                      ₹{rental.totalPrice}
                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default MyRentals;