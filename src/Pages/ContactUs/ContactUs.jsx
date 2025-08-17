import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "../../Api/apiService";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create message data to send to API
      const messageData = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        message: data.message,
        timestamp: new Date().toISOString(),
        status: "new",
      };

      // Send data to API
      await sendContactMessage(messageData);

      // Show success message
      setToastType("success");
      setToastMessage("Message sent successfully! We'll get back to you soon.");
      setShowToast(true);

      // Clear form
      reset();
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error message
      setToastType("error");
      setToastMessage("Failed to send message. Please try again later.");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);

      // Hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-green-50 to-white py-0'>
      {/* Hero Section */}
      <div className='w-full flex flex-col items-center justify-center pt-12 px-4'>
        <span className='bg-app-primary text-white rounded-full p-4 mb-4 shadow-lg'>
          <FaEnvelope size={40} />
        </span>
        <h1 className='text-3xl md:text-4xl font-extrabold text-app-primary mb-2 text-center'>
          Contact Us
        </h1>
        <p className='text-lg  text-gray-700 text-center max-w-xl mb-2'>
          Have questions, feedback, or need support? We're here to help! Reach
          out to us using the form below or through our contact details.
        </p>
      </div>
      {/* Contact Form Section */}
      <div className='max-w-2xl mx-auto px-4 py-8'>
        <form
          className='bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-6'
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
            disabled={isSubmitting}
            className={`font-semibold py-3 px-8 rounded-lg transition w-full md:w-auto mx-auto md:mx-0 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-app-primary text-white hover:bg-app-tertiary"
            }`}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Toast Notification for success and error */}
      {showToast && (
        <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-sm w-full mx-4'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toastType === "error"
                  ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                  : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
              }`}>
              {toastType === "error" ? (
                <HiX className='h-5 w-5' />
              ) : (
                <HiCheck className='h-5 w-5' />
              )}
            </div>
            <div className='ml-3 text-sm font-normal text-gray-700'>
              {toastMessage}
            </div>
            <ToastToggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
