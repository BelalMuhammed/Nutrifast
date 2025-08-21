import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAdmins } from "@/Redux/slices/userSlice";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users: admins, loading, error } = useSelector((state) => state.users);

  // Component state
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isSubmitted },
    watch,
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const watchedFields = watch();

  useEffect(() => {
    dispatch(fetchAdmins());
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [dispatch, navigate, location.pathname]);

  const onSubmit = async (data) => {
    try {
      // Find admin by email
      const admin = admins.find(
        (a) => a.email === data.email && a.role === "admin"
      );
      if (!admin) {
        showToastMessage("Admin not found", "error");
        return;
      }
      // For demo: compare plain password (replace with hash check in production)
      if (data.password !== admin.password) {
        showToastMessage("Invalid password", "error");
        return;
      }
      showToastMessage("Admin login successful!", "success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      showToastMessage("Login failed", "error");
    }
  };

  return (
    <>
      {/* Toast Message - always at the top, outside the main container */}
      {toast.show && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-lg font-semibold text-sm ${
            toast.type === "success"
              ? "bg-app-primary text-white"
              : "bg-red-500 text-white"
          }`}
          style={{ minWidth: 250, maxWidth: 400 }}>
          {toast.message}
        </div>
      )}
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-app-primary/10 to-app-secondary/10 p-4'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 transition-all duration-500 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
          autoComplete='off'>
          <h2 className='text-2xl font-bold text-app-primary mb-2 text-center'>
            Admin Login
          </h2>
          <p className='text-gray-500 text-center mb-6'>
            Sign in to your admin account
          </p>

          {/* Email */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full border-2 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300 text-sm placeholder-gray-400 ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
              placeholder='admin@email.com'
              autoComplete='username'
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full border-2 rounded-xl p-3 bg-gray-50 focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition-all duration-300 text-sm placeholder-gray-400 ${
                  errors.password ? "border-red-400" : "border-gray-200"
                }`}
                placeholder='••••••••'
                autoComplete='current-password'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-app-primary'
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.216.41 4.563 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.13.995-.36 1.41M6.53 6.53A9.956 9.956 0 002.458 12.042C3.732 14.943 7.523 19 12 19c1.657 0 3.216-.41 4.563-1.125M17.47 17.47A9.956 9.956 0 0021.542 11.958C20.268 9.057 16.477 5 12 5c-.512 0-.995.13-1.41.36'
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-app-primary text-white font-bold py-3 rounded-xl shadow  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2'
            disabled={loading || !isValid}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
}
