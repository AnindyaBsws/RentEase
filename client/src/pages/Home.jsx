import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">

        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Rent Furniture & Appliances Easily
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Affordable furniture and appliance rentals
          for your modern lifestyle.
        </p>

      </section>

      {/* Products */}
      <section className="px-8 pb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Available Products
          </h2>

          <p className="text-zinc-400">
            {products.length} Products
          </p>

        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}

      </section>

    </MainLayout>
  );
}

export default Home;