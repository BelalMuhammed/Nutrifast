import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  vendorRegisterStart,
  vendorRegisterSuccess,
  vendorRegisterFailure,
} from "../../Redux/slices/vendorSlice";
import FloatingFoodIcons from "@/Components/shared/FloatingFoodIcons/FloatingFoodIcons";

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
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
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
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (err) {
      dispatch(vendorRegisterFailure(err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-15 relative">
      <FloatingFoodIcons count={26} opacity={0.09} />

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
        className="bg-app-softest backdrop-blur-xl rounded-xl shadow-lg p-8 w-full max-w-3xl"
      >
        <h2 className="text-5xl font-medium mb-2 text-center text-app-tertiary">
          Vendor Registration
        </h2>
        <p className="text-xl text-app-tertiary mb-6 text-center flex items-center justify-center gap-2">
          Partner with us to deliver healthy food to more people!
        </p>

        {/* Business Info & Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-app-tertiary">
          {/* Business Information */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold mb-2">Business Information</h3>
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Business Name"
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">
                {errors.businessName.message}
              </p>
            )}

            <select
              {...register("businessType", {
                required: "Business type is required",
              })}
              className="w-full p-2 rounded bg-app-quaternary"
            >
              <option value="" className="placeholder-app-primary">
                Select Business Type
              </option>
              {businessTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <p className="text-red-500 text-sm">
                {errors.businessType.message}
              </p>
            )}

            <input
              {...register("website", {
                pattern: {
                  value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                  message: "Please enter a valid URL",
                },
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Website/Social Media Links"
            />

            <input
              {...register("businessAddress", {
                required: "Business address is required",
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Business Address"
            />
            {errors.businessAddress && (
              <p className="text-red-500 text-sm">
                {errors.businessAddress.message}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold mb-2">Contact Details</h3>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}

            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{8,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Phone Number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Product/Service Details & File Uploads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-app-tertiary">
          {/* Product/Service Details */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold mb-2">Product/Service Details</h3>
            {[
              "readyMeals",
              "healthySnacks",
              "beverages",
              "supplements",
              "other",
            ].map((item, key) => (
              <label key={key} className="flex items-center space-x-2">
                <input type="checkbox" {...register(item)} />
                <span>
                  {item === "readyMeals"
                    ? "Ready meals"
                    : item === "healthySnacks"
                    ? "Packaged healthy snacks"
                    : item === "beverages"
                    ? "Beverages"
                    : item === "supplements"
                    ? "Supplements"
                    : "Other"}
                </span>
              </label>
            ))}
            <input
              {...register("productsInfo", {
                required: "This field is required",
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Do your products meet any of these? Y/N"
            />
            <input
              {...register("nutritionalInfo", {
                required: "This field is required",
              })}
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
              placeholder="Do you provide nutritional information? Y/N"
            />
          </div>

          {/* File Uploads */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold mb-2">File Uploads</h3>
            <input
              type="url"
              {...register("licenseUrl", {
                required: "License URL is required",
                pattern: {
                  value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder="Commercial Registration/License URL"
              className="w-full p-2 rounded bg-app-quaternary placeholder-app-primary"
            />
            {errors.licenseUrl && (
              <p className="text-red-500 text-sm">
                {errors.licenseUrl.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms & Submit */}
        <label className="flex items-center space-x-2 mb-4 text-app-tertiary">
          <input type="checkbox" {...register("terms", { required: true })} />
          <span>I agree to the terms and conditions</span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm mb-2">
            You must agree to the terms
          </p>
        )}

        <button type="submit" className="btn-app w-full mb-2">
          Register Now
        </button>
        {loading && <p className="text-blue-500">Submitting...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
