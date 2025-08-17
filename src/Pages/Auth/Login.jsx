import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../Redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  } = useForm();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser && location.pathname !== "/login") {
      dispatch(loginSuccess(JSON.parse(savedUser)));
      navigate("/");
    }
  }, [dispatch, navigate, location.pathname]);

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());

      const res = await axios.get(
        "https://nutrifast-data.up.railway.app/users"
      );
      const adminsRes = await axios.get(
        "https://nutrifast-data.up.railway.app/admins"
      );
      const allUsers = [...res.data, ...adminsRes.data];

      const user = allUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );
<<<<<<< HEAD

      if (!user) {
        showToastMessage("Invalid email or password", "error");
        dispatch(loginFailure("Invalid email or password"));
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
=======
      if (!user) throw new Error("Invalid email or password");
      localStorage.setItem("auth:user", JSON.stringify(user));
>>>>>>> 7d445bd87756aa3dfc962eaff8e486fb6824b809
      dispatch(loginSuccess(user));
      showToastMessage("Login successful!", "success");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      dispatch(loginFailure(err.message));
      showToastMessage("Something went wrong. Try again later.", "error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
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
        className="bg-white p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-medium mb-2 text-left">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-left">
          Your journey to better health starts with one small step — log in and
          take it.
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
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <label
          htmlFor="password"
          className="block mb-1 text-app-secondary text-left"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Forgot password */}
        <div className="text-right mb-4">
          <a
            href="/reset-password"
            className="text-sm text-app-tertiary hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn-app w-full">
          Login
        </button>

        {/* Sign up link */}
        <p className="text-sm mt-4 text-center">
          Don’t you have an account?{" "}
          <a href="/register" className="text-app-tertiary font-medium">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
