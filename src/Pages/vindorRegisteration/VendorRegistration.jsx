import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  vendorRegisterStart,
  vendorRegisterSuccess,
  vendorRegisterFailure,
} from "../../Redux/slices/vendorSlice";
export default function VendorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const watchProducts = watch([
    "readyMeals",
    "healthySnacks",
    "beverages",
    "supplements",
    "other",
  ]);
  const businessTypes = [
    "Healthy Bakery Vendor",
    "Whole Grains & Cereals Supplier",
    "Meat & Poultry Supplier",
    "Dairy & Dairy Alternatives Supplier",
    "Fresh Produce Supplier",
    "Healthy Snacks Manufacturer",
    "Prepared Diet Meal Provider",
    "Special Diet Products Supplier",
    "Allergen-Free Food Supplier",
    "Medical Nutrition Products Supplier",
    "Organic & Natural Products Supplier",
  ];
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { loading, error } = useSelector((state) => state.vendor);

  const onSubmit = async (data) => {
    if (!watchProducts.includes(true)) {
      setToast({
        show: true,
        message: "Please select at least one product/service type",
        type: "error",
      });
      return;
    }
    console.log(data);
    try {
      const checkRes = await axios.get(
        `https://nutrifast-data.up.railway.app/vendors?email=${data.email}`
      );
      if (checkRes.data.length > 0) {
        setToast({
          show: true,
          message: "This email is already registered",
          type: "error",
        });
        setTimeout(() => {
          setToast({ show: false, message: "", type: "" });
        }, 3000);
        return;
      }

      dispatch(vendorRegisterStart());
      const response = await axios.post(
        "https://nutrifast-data.up.railway.app/vendors",
        data
      );
      dispatch(vendorRegisterSuccess(response.data));
      reset();
      setToast({
        show: true,
        message: "Vendor registered successfully!",
        type: "success",
      });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } catch (err) {
      dispatch(vendorRegisterFailure(err.response?.data || err.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toast.type === "success"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {toast.type === "success" ? (
                <HiCheck className="h-5 w-5" />
              ) : (
                <HiX className="h-5 w-5" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <ToastToggle onClick={() => setToast({ show: false })} />
          </Toast>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-medium mb-2 text-center">
          Vendor Registration
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Partner with us to deliver healthy food to more people!
        </p>

        <h3 className="font-semibold mb-2">Business Information</h3>
        <label className="block mb-1 text-app-secondary">Business Name</label>
        <input
          {...register("businessName", {
            required: "Business name is required",
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter your business name"
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm mb-2">
            {errors.businessName.message}
          </p>
        )}

        <label className="block mb-1 text-app-secondary">Business Type</label>
        <select
          {...register("businessType", {
            required: "Business type is required",
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary"
        >
          <option value="" className="placeholder-app-primary">
            Select business type
          </option>
          {businessTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="text-red-500 text-sm mb-2">
            {errors.businessType.message}
          </p>
        )}

        <label className="block mb-1 text-app-secondary">
          Website/Social Media Links
        </label>
        <input
          {...register("website", {
            pattern: {
              value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
              message: "Please enter a valid URL",
            },
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter website or social media links"
        />

        <label className="block mb-1 text-app-secondary">
          Business Address
        </label>
        <input
          {...register("businessAddress", {
            required: "Business address is required",
          })}
          className="w-full p-2 mb-4 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter your business address"
        />

        <h3 className="font-semibold mb-2">Contact Details</h3>
        <label className="block mb-1 text-app-secondary">Full Name</label>
        <input
          {...register("fullName", { required: "Full name is required" })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mb-2">{errors.fullName.message}</p>
        )}

        <label className="block mb-1 text-app-secondary">Email Address</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <label className="block mb-1 text-app-secondary">Phone Number</label>
        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{8,15}$/,
              message: "Please enter a valid phone number",
            },
          })}
          className="w-full p-2 mb-4 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-2">{errors.phone.message}</p>
        )}

        <h3 className="font-semibold mb-2">Product/Service Details</h3>
        <div className="mb-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("readyMeals")} />
            <span>Ready meals</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("healthySnacks")} />
            <span>Packaged healthy snacks</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("beverages")} />
            <span>Beverages</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("supplements")} />
            <span>Supplements</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("other")} />
            <span>Other</span>
          </label>
        </div>

        <input
          {...register("productsInfo", {
            required: "This field is required",
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Do your products meet any of these? Yes/No"
        />
        <input
          {...register("nutritionalInfo", {
            required: "This field is required",
          })}
          className="w-full p-2 mb-4 rounded bg-app-quaternary placeholder-app-primary"
          placeholder="Do you provide nutritional information? Yes/No"
        />

        <h3 className="font-semibold mb-2">File Uploads</h3>

        <label className="block font-medium mb-2">
          Commercial Registration/License
        </label>
        <input
          type="url"
          {...register("licenseUrl", {
            required: "License URL is required",
            pattern: {
              value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
              message: "Please enter a valid URL",
            },
          })}
          placeholder="Enter the URL to your license"
          className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.licenseUrl && (
          <p className="text-red-500 text-sm mb-2">
            {errors.licenseUrl.message}
          </p>
        )}
        {errors.website && (
          <p className="text-red-500 text-sm mb-2">{errors.website.message}</p>
        )}

        <label className="flex items-center space-x-2 mb-4">
          <input type="checkbox" {...register("terms", { required: true })} />
          <span>I agree to the terms and conditions</span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm mb-2">
            You must agree to the terms
          </p>
        )}

        <button type="submit" className="btn-app w-full">
          Register Now
        </button>
        {loading && <p className="text-blue-500">Submitting...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
