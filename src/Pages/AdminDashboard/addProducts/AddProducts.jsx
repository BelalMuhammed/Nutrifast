import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProducts() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
     
      name: "",
      category: "",
      dietTypes: [],
      medicalConditions: [],
      allergens: [],
      calories: "",
      price: "",
      weight: "",
      description: "",
      image: "",
      ingredients: [],
      brand: "",
      stock: "in-stock",
      rating: "",
      tags: [],
    },
  });

  const [imageError, setImageError] = useState(false);
  const imageUrl = watch("image");


  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (file) => {
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

    const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };
  const submitHandler = (data) => {
    data.dietTypes = data.dietTypes.split(",").map((item) => item.trim());
    data.medicalConditions = data.medicalConditions.split(",").map((item) => item.trim());
    data.allergens = data.allergens.split(",").map((item) => item.trim());
    data.ingredients = data.ingredients.split(",").map((item) => item.trim());
    data.tags = data.tags.split(",").map((item) => item.trim());

    console.log("New Product:", data);
    // You can POST to your API or JSON server here
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {/* Product ID */}
      {/* <div>
        <label className="block font-semibold">Product ID</label>
        <input
          {...register("id", { required: "Product ID is required" })}
          className="w-full border rounded p-2"
          placeholder="p001"
        />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
      </div> */}

      {/* Product Name */}
      <div>
        <label className="block font-semibold">Product Name</label>
        <input
          {...register("name", { required: "Product name is required" })}
          className="w-full border rounded p-2"
          placeholder="Whole Wheat Sourdough Bread"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold">Category</label>
        <input
          {...register("category", { required: "Category is required" })}
          className="w-full border rounded p-2"
          placeholder="Healthy Bakery"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {/* Diet Types */}
      <div>
        <label className="block font-semibold">Diet Types (comma separated)</label>
        <input
          {...register("dietTypes", { required: "At least one diet type is required" })}
          className="w-full border rounded p-2"
          placeholder="Plant-Based, Vegan"
        />
        {errors.dietTypes && <p className="text-red-500 text-sm">{errors.dietTypes.message}</p>}
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block font-semibold">Medical Conditions (comma separated)</label>
        <input
          {...register("medicalConditions")}
          className="w-full border rounded p-2"
          placeholder="High Cholesterol, Diabetes"
        />
      </div>

      {/* Allergens */}
      <div>
        <label className="block font-semibold">Allergens (comma separated)</label>
        <input
          {...register("allergens")}
          className="w-full border rounded p-2"
          placeholder="Gluten, Nuts"
        />
      </div>

      {/* Calories & Price */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Calories</label>
          <input
            type="number"
            {...register("calories", { required: "Calories are required", min: 0 })}
            className="w-full border rounded p-2"
            placeholder="69"
          />
          {errors.calories && <p className="text-red-500 text-sm">{errors.calories.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required", min: 1 })}
            className="w-full border rounded p-2"
            placeholder="55"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
      </div>

      {/* Weight */}
      <div>
        <label className="block font-semibold">Weight</label>
        <input
          {...register("weight")}
          className="w-full border rounded p-2"
          placeholder="500g"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded p-2"
          placeholder="Freshly baked whole wheat sourdough..."
        />
      </div>

      {/* Image URL + Preview */}
      {/* <div>
        <label className="block font-semibold">Image URL</label>
        <input
          {...register("image", { required: "Image URL is required" })}
          className="w-full border rounded p-2"
          placeholder="https://..."
          onChange={(e) => {
            setImageError(false);
            register("image").onChange(e);
          }}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {imageUrl && !imageError && (
          <img
            src={imageUrl}
            alt="Product Preview"
            className="mt-3 w-48 h-48 object-cover rounded border"
            onError={() => setImageError(true)}
          />
        )}
        {imageError && <p className="text-red-500 text-sm">Invalid image URL</p>}
      </div> */}
          {/* Image Upload */}
      <div>
        <label className="block font-medium">Product Image</label>
        <div
          className="border-2 border-dashed rounded p-4 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={(e) => handleImageChange(e.target.files[0])}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto h-40 object-contain"
              />
            ) : (
              <p>Drag & Drop image here or click to choose</p>
            )}
          </label>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <label className="block font-semibold">Ingredients (comma separated)</label>
        <input
          {...register("ingredients")}
          className="w-full border rounded p-2"
          placeholder="Whole wheat flour, Water, Salt"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block font-semibold">Brand</label>
        <input
          {...register("brand")}
          className="w-full border rounded p-2"
          placeholder="HealthyHub Bakery"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block font-semibold">Stock Status</label>
        <select {...register("stock")} className="w-full border rounded p-2">
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="block font-semibold">Rating</label>
        <input
          type="number"
          step="0.1"
          {...register("rating", { min: 0, max: 5 })}
          className="w-full border rounded p-2"
          placeholder="4.5"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block font-semibold">Tags (comma separated)</label>
        <input
          {...register("tags")}
          className="w-full border rounded p-2"
          placeholder="artisan, fermented"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
