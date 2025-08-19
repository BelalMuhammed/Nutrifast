import LoaderSpinner from "@/Components/shared/Loaders/Loader";
import { addProduct } from "@/Redux/slices/productSlice";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

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
        <div className="relative w-full">
            <label className="block font-semibold mb-1">{label}</label>

            {/* Dropdown button */}
            <div
                className="border rounded p-2 bg-white cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {selected.length > 0 ? selected.join(", ") : `Select ${label}`}
            </div>

            {/* Dropdown content */}
            {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-48 overflow-y-auto p-2">
                    {options.map((opt) => (
                        <label
                            key={opt.id}
                            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={opt.name}
                                {...register(registerName)}
                                onChange={() => toggleOption(opt.name)}
                            />
                            {opt.name}
                        </label>
                    ))}
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
                    <label className="block font-medium">{label}</label>
                    <div className="flex flex-wrap gap-2 border rounded p-2">
                        {field.value.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() =>
                                        field.onChange(field.value.filter((_, i) => i !== idx))
                                    }
                                    className="text-red-500"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && inputValue.trim()) {
                                    e.preventDefault();
                                    field.onChange([...field.value, inputValue.trim()]);
                                    setInputValue("");
                                }
                            }}
                            placeholder="Type and press Enter"
                            className="flex-1 outline-none"
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

    const [imagePreview, setImagePreview] = useState(null);

    // ✅ Fetch filter data
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

    // ✅ handle image preview
    const handleImageChange = (file) => {
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageChange(file);
    };

    const dispatch = useDispatch();

    const submitHandler = (data) => {
        console.log("New Product:", data);
        // 👉 Here you POST product to your API
        dispatch(addProduct(data));
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

            {/* Product Name & Category */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Product Name</label>
                    <input
                        {...register("name", { required: "Product name is required" })}
                        className="w-full border rounded p-2"
                        placeholder="Whole Wheat Sourdough Bread"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full border rounded p-2"
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>
            </div>

            {/* ✅ Replaced with dropdowns */}
            <CheckboxDropdown
                label="Diet Types"
                options={dietTypes}
                registerName="dietTypes"
                register={register}
            />

            <CheckboxDropdown
                label="Medical Conditions"
                options={medicalConditions}
                registerName="medicalConditions"
                register={register}
            />

            <CheckboxDropdown
                label="Allergens"
                options={allergens}
                registerName="allergens"
                register={register}
            />

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

            {/* Weight & Brand */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Weight</label>
                    <input {...register("weight")} className="w-full border rounded p-2" placeholder="500g" />
                </div>
                <div>
                    <label className="block font-semibold">Brand</label>
                    <input {...register("brand")} className="w-full border rounded p-2" placeholder="HealthyHub Bakery" />
                </div>
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

            {/* Stock */}
            <div>
                <label className="block font-semibold">Stock Status</label>
                <select {...register("stock")} className="w-full border rounded p-2">
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
            </div>

            {/* ✅ Tags Input */}
            <TagsInput control={control} name="tags" label="Tags" />

            {/* ✅ Ingredients Input */}
            <TagsInput control={control} name="ingredients" label="Ingredients" />

            {/* Image Upload */}
            {/* <div>
                <label className="block font-medium">Product Image</label>
                <div
                    className="border-2 border-dashed rounded p-4 text-center cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
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
            </div> */}
            {/* Image URL Input */}
            <div>
                <label className="block font-medium">Product Image (URL)</label>
                <input
                    type="text"
                    {...register("image", {
                        required: "Image URL is required",
                        pattern: {
                            value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i,
                            message: "Please enter a valid image URL",
                        },
                    })}
                    onChange={(e) => setImagePreview(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border rounded p-2"
                />

                {/* Preview */}
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto mt-2 h-40 object-contain rounded"
                        onError={() => setImagePreview(null)} // hide preview if link is broken
                    />
                )}

                {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
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

            {/* Submit */}
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                Add Product
            </button>
        </form>
    );
}
