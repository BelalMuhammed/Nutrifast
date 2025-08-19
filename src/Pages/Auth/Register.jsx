import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import FloatingFoodIcons from "@/Components/shared/FloatingFoodIcons/FloatingFoodIcons";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const usersResponse = await axios.get(
        "https://nutrifast-data.up.railway.app/users"
      );
      const exists = usersResponse.data.find(
        (user) =>
          user.email.toLowerCase().trim() === data.email.toLowerCase().trim()
      );
      if (exists) {
        showToastMessage(
          "This email is already registered. Please login instead.",
          "error"
        );
        return;
      }

      const payload = {
        username: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: "user",
      };

      await axios.post("https://nutrifast-data.up.railway.app/users", payload);
      showToastMessage("Registration successful!", "success");
      reset();
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      showToastMessage(
        error.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-10">
      <FloatingFoodIcons count={26} opacity={0.09} />

      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                ${
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
            <ToastToggle
              onClick={() => setToast({ show: false, message: "", type: "" })}
            />
          </Toast>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-app-softest backdrop-blur-xl rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-5xl font-medium mb-2 text-center text-app-tertiary">
          Sign Up
        </h2>
        <p className="text-xl text-app-tertiary mb-6 text-center flex items-center justify-center gap-2">
          We’re happy to have you with us!
        </p>

        {/* Full Name */}
        <label
          htmlFor="fullName"
          className="block mb-1 text-app-tertiary text-left"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          placeholder="Full Name"
          {...register("fullName", { required: "Full name is required" })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mb-2">{errors.fullName.message}</p>
        )}

        {/* Email */}
        <label
          htmlFor="email"
          className="block mb-1 text-app-tertiary text-left"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Example@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email format",
            },
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Phone */}
        <label
          htmlFor="phone"
          className="block mb-1 text-app-tertiary text-left"
        >
          Phone
        </label>
        <input
          id="phone"
          type="text"
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Phone number is not valid",
            },
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-2">{errors.phone.message}</p>
        )}

        {/* Password */}
        <label
          htmlFor="password"
          className="block mb-1 text-app-tertiary text-left"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-full p-2 mb-4 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        <button type="submit" className="btn-app w-full">
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-app-tertiary font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
