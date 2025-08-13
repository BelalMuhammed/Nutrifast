import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // You can handle the form submission here (e.g., send to API)
    alert("Message sent!\n" + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className='w-full min-h-screen  py-0'>
      {/* Hero Section */}
      <div className='w-full flex flex-col items-center justify-center py-12 px-4'>
        <span className='bg-app-primary text-white rounded-full p-4 mb-4 shadow-lg'>
          <FaEnvelope size={40} />
        </span>
        <h1 className='text-4xl md:text-5xl font-extrabold text-app-tertiary mb-2 text-center'>
          Contact Us
        </h1>
        <p className='text-lg md:text-xl text-gray-700 text-center max-w-xl mb-4'>
          Have questions, feedback, or need support? We're here to help! Reach
          out to us using the form below or through our contact details.
        </p>
      </div>
      {/* Contact Form Section */}
      <div className='max-w-2xl mx-auto px-4 py-8'>
        <form
          className='bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6'
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-app-tertiary flex items-center gap-2'>
              <FaUser /> Your Name
            </label>
            <input
              type='text'
              placeholder='Name'
              className={`border border-app-quaternary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span className='text-red-500 text-sm'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-app-tertiary flex items-center gap-2'>
              <FaEnvelope /> Your Email
            </label>
            <input
              type='email'
              placeholder='Email'
              className={`border border-app-quaternary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-app-tertiary flex items-center gap-2'>
              Your Message
            </label>
            <textarea
              placeholder='Message'
              className={`border border-app-quaternary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary ${
                errors.message ? "border-red-500" : ""
              }`}
              rows={4}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <span className='text-red-500 text-sm'>
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type='submit'
            className='bg-app-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-app-tertiary transition w-full md:w-auto mx-auto md:mx-0'>
            Send Message
          </button>
        </form>
        <div className='mt-10 bg-app-quaternary/30 rounded-xl p-6 shadow flex flex-col gap-2'>
          <h2 className='text-xl font-bold text-app-tertiary mb-2 flex items-center gap-2'>
            <FaEnvelope className='text-app-primary' /> Contact Details
          </h2>
          <p className='text-gray-700 flex items-center gap-2'>
            <FaEnvelope className='text-app-primary' /> Email:
            support@nutrifast.com
          </p>
          <p className='text-gray-700 flex items-center gap-2'>
            <FaPhoneAlt className='text-app-primary' /> Phone: +20 123 456 7890
          </p>
          <p className='text-gray-700 flex items-center gap-2'>
            <FaMapMarkerAlt className='text-app-primary' /> Address: Alexandria,
            Egypt
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
