import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const payload = {
      username: data.firstName + data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: "user",
    };
    try {
      const response = await axios.post(
        "https://nutrifast-data.up.railway.app/users",
        payload
      );
      console.log("User registered:", response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error during registration");
    }
  };
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8  w-full max-w-md"
      >
        <h2 className="text-4xl font-medium mb-2 text-left ">Sign Up</h2>
        <p className="text-sm text-gray-500 mb-6 text-left">
          show up, glow up.
        </p>
        {/* First Name */}
        <label
          htmlFor="firstName"
          className="block mb-1 text-app-secondary text-left"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          {...register("firstName", { required: "First name is required" })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mb-2">
            {errors.firstName.message}
          </p>
        )}
        {/* Last Name  */}
        <label
          htmlFor="lastName"
          className="block mb-1 text-app-secondary text-left"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          className="w-full p-2 mb-2 rounded bg-app-quaternary placeholder-app-primary"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mb-2">{errors.lastName.message}</p>
        )}
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
        {/* Phone */}
        <label
          htmlFor="phone"
          className="block mb-1 text-app-secondary text-left"
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
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}
        <div className="text-right mb-4">
          <a href="#" className="text-sm text-app-tertiary hover:underline">
            Forgot Password?
          </a>
        </div>
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
