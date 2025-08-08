import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/slices/productSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct)
    return (
      <p className="text-center mt-10 text-lg text-app-secondary animate-pulse">
        Loading product details...
      </p>
    );

  return (
    <div className=" min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
        {/* Image */}
        <div className="relative w-full h-full">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="rounded-3xl w-full object-cover shadow-md max-h-[500px] transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="space-y-6 text-app-secondary">
          <h1 className="text-4xl font-extrabold text-app-tertiary leading-tight">
            {selectedProduct.name}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="bg-app-quaternary text-app-tertiary px-4 py-1.5 rounded-full text-sm font-medium">
              {selectedProduct.weight}
            </span>
            <span className="bg-app-quaternary text-app-tertiary px-4 py-1.5 rounded-full text-sm font-medium">
              {selectedProduct.calories} kcal
            </span>
            <span className="bg-app-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              {selectedProduct.price} EGP
            </span>
          </div>

          {selectedProduct.dietTypes?.length > 0 && (
            <div>
              <h4 className="font-semibold text-app-secondary mb-1">Diet Types:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.dietTypes.map((type, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.medicalConditions?.length > 0 && (
            <div>
              <h4 className="font-semibold text-app-secondary mb-1">Suitable For:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.medicalConditions.map((cond, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.allergens?.length > 0 && (
            <div>
              <h4 className="font-semibold text-app-secondary mb-1">Allergens:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.allergens.map((allergen, i) => (
                  <span
                    key={i}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.tags?.length > 0 && (
            <div>
              <h4 className="font-semibold text-app-secondary mb-1">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.ingredients?.length > 0 && (
            <div>
              <h4 className="font-semibold text-app-secondary mb-1">Ingredients:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {selectedProduct.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium shadow-sm ${
                selectedProduct.stock === "in-stock"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {selectedProduct.stock}
            </span>
            <span className="text-yellow-600 font-semibold text-sm">
              ★ {selectedProduct.rating}/5
            </span>
          </div>

          <div className="pt-6">
            <button className="btn-app w-full md:w-1/2 text-base py-3 shadow-md hover:shadow-lg transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;