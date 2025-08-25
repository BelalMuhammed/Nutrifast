import LoaderSpinner from "@/Components/shared/Loaders/Loader";
import { addProduct } from "@/Redux/slices/productSlice";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

// Simple SVG Icons
const ChevronDownIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4v16m8-8H4'
    />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
);

const PhotoIcon = ({ className }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

// 🔽 Reusable dropdown with checkboxes
function CheckboxDropdown({ label, options, registerName, register }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleOption = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  return (
    <div className='relative w-full'>
      <label className='block text-sm font-bold text-gray-800 mb-3'>
        {label}
      </label>

      {/* Dropdown button */}
      <div
        className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 cursor-pointer hover:border-green-600 hover:bg-white transition-all duration-300 flex items-center justify-between shadow-sm'
        onClick={() => setOpen(!open)}>
        <span
          className={`text-sm font-medium ${selected.length > 0 ? "text-gray-900" : "text-gray-600"
            }`}>
          {selected.length > 0 ? selected.join(", ") : `Select ${label}`}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Dropdown content */}
      {open && (
        <div className='absolute z-20 mt-2 w-full bg-white border-2 border-gray-300 rounded-xl shadow max-h-48 overflow-y-auto'>
          <div className='p-2 space-y-3'>
            {options.map((opt) => (
              <label
                key={opt.id}
                className='flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200'>
                <input
                  type='checkbox'
                  value={opt.name}
                  {...register(registerName)}
                  onChange={() => toggleOption(opt.name)}
                  className='w-5 h-5 text-app-primary bg-gray-100 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
                />
                <span className='text-sm font-medium text-gray-800'>
                  {opt.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 🔽 Tags Input Component
// ✅ Reusable Tags Input
function TagsInput({ control, name, label }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <div>
          <label className='block text-sm font-bold text-gray-800 mb-3'>
            {label}
          </label>
          <div className='flex flex-wrap gap-3 border-2 border-gray-300 rounded-xl p-2 bg-gray-50 min-h-[60px] focus-within:border-green-600 focus-within:bg-white transition-all duration-300'>
            {field.value.map((tag, idx) => (
              <span
                key={idx}
                className='bg-app-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-md'>
                {tag}
                <button
                  type='button'
                  onClick={() =>
                    field.onChange(field.value.filter((_, i) => i !== idx))
                  }
                  className='text-white hover:text-red-200 transition-colors duration-200'>
                  <XMarkIcon className='w-4 h-4' />
                </button>
              </span>
            ))}
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  e.preventDefault();
                  field.onChange([...field.value, inputValue.trim()]);
                  setInputValue("");
                }
              }}
              placeholder='Type and press Enter'
              className='flex-1 outline-none bg-transparent text-sm placeholder-gray-600 font-medium min-w-[150px]'
            />
          </div>
        </div>
      )}
    />
  );
}

export default function AddProducts() {






  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      dietTypes: [],
      medicalConditions: [],
      allergens: [],
      calories: 0,   // number
      price: 0,      // number
      weight: 0,     // number
      description: "",
      image: "",
      ingredients: [],
      brand: "",
      stock: "in-stock",
      rating: 0,     // number
      tags: [],
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    fetch("https://nutrifast-data.up.railway.app/filters")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.Categories || []);
        setDietTypes(data.DietTypes || []);
        setMedicalConditions(data.MedicalConditions || []);
        setAllergens(data.Allergens || []);
      })
      .catch((err) => console.error("Failed to fetch filters:", err));
  }, []);

  const dispatch = useDispatch();

  const submitHandler = (data) => {
    console.log("New Product:", data);
    // 👉 Here you POST product to your API
    dispatch(addProduct(data));
  };

  return (
    <div className='min-h-screen  p-2 sm:p-6 lg:p-8'>
      <div className='mx-auto'>
        {/* Header Section */}
        <div className='bg-white rounded-2xl shadow border border-gray-200 p-6 sm:p-8 mb-6'>
          <div className='flex items-center gap-4 mb-2'>
            <div className='w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg'>
              <PlusIcon className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                Add New Product
              </h1>
              <p className='text-gray-600 text-sm sm:text-base font-medium'>
                Create a new product for your Nutrifast store
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className='bg-white rounded-2xl shadow border border-gray-200 p-6 sm:p-8 space-y-8'>
          {/* Basic Information Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-green-600 pb-3'>
              Basic Information
            </h3>

            {/* Product Name & Category */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Product Name
                </label>
                <input
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  placeholder='Whole Wheat Sourdough Bread'
                />
                {errors.name && (
                  <p className='text-red-600 text-xs mt-2 flex items-center gap-1 font-medium'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm font-medium'>
                  <option value=''>-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='text-red-600 text-xs mt-2 flex items-center gap-1 font-medium'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dietary & Medical Information Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-green-600 pb-3'>
              Dietary & Medical Information
            </h3>

            <div className='grid md:grid-cols-3 gap-6'>
              <CheckboxDropdown
                label='Diet Types'
                options={dietTypes}
                registerName='dietTypes'
                register={register}
              />

              <CheckboxDropdown
                label='Medical Conditions'
                options={medicalConditions}
                registerName='medicalConditions'
                register={register}
              />

              <CheckboxDropdown
                label='Allergens'
                options={allergens}
                registerName='allergens'
                register={register}
              />
            </div>
          </div>

          {/* Pricing & Details Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-app-primary pb-3'>
              Pricing & Details
            </h3>

            {/* Calories & Price */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Calories
                </label>
                <input
                  type='number'
                  {...register("calories", {
                    required: "Calories are required",
                    min: 0,
                    valueAsNumber: true
                  })}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  placeholder='69'
                />
                {errors.calories && (
                  <p className='text-red-600 text-xs mt-2 flex items-center gap-1 font-medium'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.calories.message}
                  </p>
                )}
              </div>
              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Price
                </label>
                <input
                  type='number'
                  {...register("price", {
                    required: "Price is required",
                    min: 1,
                    valueAsNumber: true
                  })}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  placeholder='55'
                />
                {errors.price && (
                  <p className='text-red-600 text-xs mt-2 flex items-center gap-1 font-medium'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Weight & Brand */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Weight
                </label>
                <input
                  {...register("weight")}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  placeholder='500g'
                />
              </div>
              <div>
                <label className='block text-sm font-bold text-gray-800 mb-3'>
                  Brand
                </label>
                <input
                  {...register("brand")}
                  className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  placeholder='HealthyHub Bakery'
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-green-600 pb-3'>
              Product Description
            </h3>

            <div>
              <label className='block text-sm font-bold text-gray-800 mb-3'>
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 resize-vertical font-medium'
                placeholder='Freshly baked whole wheat sourdough bread with a perfect balance of nutrition and taste...'
              />
            </div>

            {/* Stock */}
            <div>
              <label className='block text-sm font-bold text-gray-800 mb-3'>
                Stock Status
              </label>
              <select
                {...register("stock")}
                className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm font-medium'>
                <option value='in-stock'>In Stock</option>
                <option value='out-of-stock'>Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Tags & Ingredients Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-green-600 pb-3'>
              Tags & Ingredients
            </h3>

            <div className='grid md:grid-cols-2 gap-6'>
              {/* Tags Input */}
              <TagsInput control={control} name='tags' label='Tags' />

              {/* Ingredients Input */}
              <TagsInput
                control={control}
                name='ingredients'
                label='Ingredients'
              />
            </div>
          </div>

          {/* Image & Rating Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-gray-900 border-b-2 border-green-600 pb-3'>
              Media & Rating
            </h3>

            {/* Image URL Input */}
            <div>
              <label className='block text-sm font-bold text-gray-800 mb-3'>
                Product Image (URL)
              </label>
              <div className='space-y-4'>
                <div className='relative'>
                  <input
                    type='text'
                    {...register("image", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i,
                        message: "Please enter a valid image URL",
                      },
                    })}
                    onChange={(e) => setImagePreview(e.target.value)}
                    placeholder='https://example.com/image.jpg'
                    className='w-full border-2 border-gray-300 rounded-xl p-2 pr-12 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                  />
                  <PhotoIcon className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600' />
                </div>

                {errors.image && (
                  <p className='text-red-600 text-xs flex items-center gap-1 font-medium'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.image.message}
                  </p>
                )}

                {/* Preview */}
                {imagePreview && (
                  <div className='border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-100'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='mx-auto max-h-48 object-contain rounded-lg shadow-lg'
                      onError={() => setImagePreview(null)} // hide preview if link is broken
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className='block text-sm font-bold text-gray-800 mb-3'>
                Rating
              </label>
              <input
                type='number'
                step='0.1'
                {...register("rating", { min: 0, max: 5, valueAsNumber: true })}
                className='w-full border-2 border-gray-300 rounded-xl p-2 bg-gray-50 focus:border-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 text-sm placeholder-gray-600 font-medium'
                placeholder='4.5'

              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-6 border-t-2 border-gray-200'>
            <button
              type='submit'
              className='w-full bg-app-primary text-white p-2 rounded-xl transition-all duration-300 font-bold text-lg shadow hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center gap-3 border-2 border-app-primary'>
              <PlusIcon className='w-6 h-6' />
              Add Product to Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
