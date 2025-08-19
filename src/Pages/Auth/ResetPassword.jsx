import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import FloatingFoodIcons from "@/Components/shared/FloatingFoodIcons/FloatingFoodIcons";

export default function ResetPassword() {
  const navigate = useNavigate();

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        "https://nutrifast-data.up.railway.app/users"
      );
      const adminsRes = await axios.get(
        "https://nutrifast-data.up.railway.app/admins"
      );

      let user = res.data.find((u) => u.email === data.email);
      let endpoint = "users";

      if (!user) {
        user = adminsRes.data.find((u) => u.email === data.email);
        endpoint = "admins";
      }

      if (!user) {
        showToastMessage("Email not found", "error");
        return;
      }

      await axios.put(
        `https://nutrifast-data.up.railway.app/${endpoint}/${user.id}`,
        {
          ...user,
          password: data.password,
        }
      );

      showToastMessage("Password reset successfully!", "success");
      reset();

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      showToastMessage("Something went wrong. Try again later.", "error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Background icons layer (does not affect layout) */}
      <FloatingFoodIcons count={26} opacity={0.09} />
      {/* Toast Notification */}
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
        className="bg-app-softest rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-medium mb-2 text-left">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6 text-left">
          Enter your email and new password to reset your account.
        </p>

        {/* Email */}
        <label
          htmlFor="email"
          className="block mb-1 text-app-secondary text-left"
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
          className="w-full p-2 mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* New Password */}
        <label
          htmlFor="password"
          className="block mb-1 text-app-secondary text-left"
        >
          New Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your new password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full p-2 mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Submit button */}
        <button type="submit" className="btn-app w-full">
          Reset Password
        </button>

        {/* Back to login */}
        <p className="text-sm mt-4 text-center">
          Remembered your password?{" "}
          <a href="/login" className="text-app-tertiary font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
