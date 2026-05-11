import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-300">

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-5">

        <h2 className="text-2xl font-bold mb-2">
          {product.title}
        </h2>

        <p className="text-zinc-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">

          <div>
            <p className="text-zinc-500 text-sm">
              Rent Per Day
            </p>

            <h3 className="text-2xl font-bold">
              ₹{product.rentPerDay}
            </h3>
          </div>

          <Link
            to={`/products/${product._id}`}
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-zinc-200 transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;