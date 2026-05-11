import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Fetch Products
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

  // Categories
  const categories = [
    "All",
    "Furniture",
    "Electronics",
    "Computers",
    "Appliances",
  ];

  // Filter Products
  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

      {/* Search + Filter */}
      <section className="px-8 mb-16">

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-[400px] bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-white"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-4">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-5 py-3 rounded-xl transition font-medium ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-white border border-zinc-800"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* Products */}
      <section className="px-8 pb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Available Products
          </h2>

          <p className="text-zinc-400">
            {filteredProducts.length} Products
          </p>

        </div>

        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold mb-4">
              No Products Found
            </h2>

            <p className="text-zinc-500">
              Try changing search or category
            </p>

          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (

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