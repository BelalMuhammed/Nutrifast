import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div className="h-screen flex items-center justify-center">
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
          placeholder="At least 8 characters"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Forgot password */}
        <div className="text-right mb-4">
          <a href="#" className="text-sm text-app-tertiary hover:underline">
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
