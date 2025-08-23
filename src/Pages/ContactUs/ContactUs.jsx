import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "../../Api/apiService";
import ToastNotification from "../../Components/shared/ToastNotification";
import { HiX } from "react-icons/hi";
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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        {/* Background decorations */}
        <div className='absolute inset-0 bg-gradient-to-r from-app-primary/5 via-app-secondary/3 to-app-quaternary/5'></div>
        <div className='absolute top-20 left-10 w-32 h-32 bg-app-primary/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-app-secondary/10 rounded-full blur-3xl'></div>

        <div className='relative container mx-auto px-2 py-5'>
          <div className='text-center'>
            {/* Icon */}
            <div className='mb-4'>
              <div className='relative inline-block'>
                <div className='w-20 h-20 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                  <FaEnvelope className='text-app-primary' size={32} />
                </div>
                <div className='absolute -inset-4 bg-gradient-to-r from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg -z-10'></div>
              </div>
            </div>

            {/* Title */}
            <div className='mb-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-app-secondary tracking-tight mb-2'>
                Contact{" "}
                <span className='text-app-primary bg-gradient-to-r from-app-primary to-app-secondary bg-clip-text text-transparent'>
                  Us
                </span>
              </h2>
              <div className='w-10 h-1 bg-gradient-to-r from-app-primary to-app-secondary mx-auto rounded-full mb-3'></div>
            </div>

            {/* Description */}
            <div className='max-w-2xl mx-auto mb-6'>
              <p className='text-base md:text-lg text-gray-700 leading-relaxed mb-2'>
                Have questions, feedback, or need support? We're here to help!
                <span className='font-bold text-app-primary'>
                  {" "}
                  Reach out to us
                </span>{" "}
                using the form below or through our contact details.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className='flex items-center justify-center min-h-[60vh] py-5 text-base sm:text-lg'>
        <div className='w-full max-w-3xl flex justify-center'>
          <div className='w-full'>
            <div className='bg-white rounded-2xl shadow border border-gray-100 p-4 sm:p-6'>
              <div className='mb-4'>
                <h2 className='text-xl lg:text-2xl font-bold text-app-secondary mb-2'>
                  Send us a Message
                </h2>
                <p className='text-gray-600 text-base'>
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className='space-y-4 text-base'>
                {/* Name Input */}
                <div className='group'>
                  <label className='flex text-app-secondary font-semibold mb-1 items-center gap-2 text-base'>
                    <FaUser className='text-app-primary' size={14} />
                    Your Name
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Enter your full name'
                      className={`w-full px-3 py-2 rounded-lg border text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-app-primary/20 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-app-primary group-hover:border-gray-300"
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
                      <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <HiX className='text-red-500' size={16} />
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className='text-red-500 text-sm mt-1 flex items-center gap-2'>
                      <HiX size={14} />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className='group'>
                  <label className='flex text-app-secondary font-semibold mb-1 items-center gap-2 text-base'>
                    <FaEnvelope className='text-app-primary' size={14} />
                    Your Email
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      placeholder='Enter your email address'
                      className={`w-full px-3 py-2 rounded-lg border text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-app-primary/20 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-app-primary group-hover:border-gray-300"
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
                      <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <HiX className='text-red-500' size={16} />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1 flex items-center gap-2'>
                      <HiX size={14} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className='group'>
                  <label className='block text-app-secondary font-semibold mb-1 text-base'>
                    Your Message
                  </label>
                  <div className='relative'>
                    <textarea
                      placeholder='Tell us how we can help you...'
                      rows={4}
                      className={`w-full px-3 py-2 rounded-lg border text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-app-primary/20 resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-app-primary group-hover:border-gray-300"
                      }`}
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <div className='absolute top-2 right-2'>
                        <HiX className='text-red-500' size={16} />
                      </div>
                    )}
                  </div>
                  {errors.message && (
                    <p className='text-red-500 text-sm mt-1 flex items-center gap-2'>
                      <HiX size={14} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className='pt-2'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`w-full relative overflow-hidden font-semibold py-2 px-4 rounded-lg text-base transition-all duration-300 transform ${
                      isSubmitting
                        ? "bg-app-primary cursor-not-allowed text-white scale-95"
                        : "bg-app-primary text-white hover:bg-app-secondary hover:shadow-lg hover:shadow-app-primary/30 hover:-translate-y-1 active:scale-95"
                    }`}>
                    {isSubmitting && (
                      <div className='absolute inset-0 bg-white/20 animate-pulse'></div>
                    )}
                    <span className='relative flex items-center justify-center gap-2'>
                      {isSubmitting ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaEnvelope size={14} />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Centralized Toast Notification */}
      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ContactUs;
