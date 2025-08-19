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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        {/* Background decorations */}
        <div className='absolute inset-0 bg-gradient-to-r from-app-primary/5 via-app-secondary/3 to-app-quaternary/5'></div>
        <div className='absolute top-20 left-10 w-32 h-32 bg-app-primary/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-app-secondary/10 rounded-full blur-3xl'></div>

        <div className='relative container mx-auto px-4 py-16 lg:py-20'>
          <div className='text-center'>
            {/* Icon */}
            <div className='mb-8'>
              <div className='relative inline-block'>
                <div className='w-20 h-20 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                  <FaEnvelope className='text-white' size={32} />
                </div>
                <div className='absolute -inset-4 bg-gradient-to-r from-app-primary/20 to-app-secondary/20 rounded-2xl blur-lg -z-10'></div>
              </div>
            </div>

            {/* Title */}
            <div className='mb-8'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-app-secondary mb-4'>
                Contact{" "}
                <span className='text-app-primary bg-gradient-to-r from-app-primary to-app-secondary bg-clip-text text-transparent'>
                  Us
                </span>
              </h1>
              <div className='w-16 h-1 bg-gradient-to-r from-app-primary to-app-secondary mx-auto rounded-full mb-6'></div>
            </div>

            {/* Description */}
            <div className='max-w-3xl mx-auto mb-12'>
              <p className='text-xl md:text-2xl text-gray-700 leading-relaxed mb-6'>
                Have questions, feedback, or need support? We're here to help!
                <span className='font-bold text-app-primary'>
                  {" "}
                  Reach out to us
                </span>{" "}
                using the form below or through our contact details.
              </p>
              <p className='text-lg text-gray-600'>
                Our team typically responds within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className='relative py-16 lg:py-24'>
        {/* Background decorations */}
        <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-app-primary/5'></div>
        <div className='absolute top-10 right-20 w-24 h-24 bg-app-secondary/10 rounded-full blur-2xl'></div>
        <div className='absolute bottom-20 left-10 w-32 h-32 bg-app-primary/10 rounded-full blur-3xl'></div>

        <div className='relative container mx-auto px-4'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid lg:grid-cols-5 gap-12 lg:gap-16'>
              {/* Contact Info Panel */}
              <div className='lg:col-span-2'>
                <div className='bg-gradient-to-br from-app-primary via-app-primary to-app-secondary rounded-3xl p-8 lg:p-10 text-white shadow-2xl h-full'>
                  <div className='mb-8'>
                    <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
                      Get in Touch
                    </h2>
                    <p className='text-white/90 text-lg'>
                      We'd love to hear from you. Send us a message and we'll
                      respond as soon as possible.
                    </p>
                  </div>

                  <div className='space-y-8'>
                    {/* Contact Items */}
                    <div className='flex items-start gap-4 group'>
                      <div className='w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300'>
                        <FaPhoneAlt className='text-white' size={20} />
                      </div>
                      <div>
                        <h3 className='font-semibold text-lg mb-1'>Phone</h3>
                        <p className='text-white/90'>+20 123 456 789</p>
                        <p className='text-white/90'>+20 987 654 321</p>
                      </div>
                    </div>

                    <div className='flex items-start gap-4 group'>
                      <div className='w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300'>
                        <FaEnvelope className='text-white' size={20} />
                      </div>
                      <div>
                        <h3 className='font-semibold text-lg mb-1'>Email</h3>
                        <p className='text-white/90'>info@nutrifast.com</p>
                        <p className='text-white/90'>support@nutrifast.com</p>
                      </div>
                    </div>

                    <div className='flex items-start gap-4 group'>
                      <div className='w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300'>
                        <FaMapMarkerAlt className='text-white' size={20} />
                      </div>
                      <div>
                        <h3 className='font-semibold text-lg mb-1'>Address</h3>
                        <p className='text-white/90'>123 Nutrition Street</p>
                        <p className='text-white/90'>Cairo, Egypt</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className='mt-12'>
                    <div className='flex gap-4'>
                      <div className='w-3 h-3 bg-white/30 rounded-full'></div>
                      <div className='w-3 h-3 bg-white/50 rounded-full'></div>
                      <div className='w-3 h-3 bg-white/70 rounded-full'></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className='lg:col-span-3'>
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10'>
                  <div className='mb-8'>
                    <h2 className='text-3xl lg:text-4xl font-bold text-app-secondary mb-4'>
                      Send us a Message
                    </h2>
                    <p className='text-gray-600 text-lg'>
                      Fill out the form below and our team will get back to you
                      within 24 hours.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className='space-y-6'>
                    {/* Name Input */}
                    <div className='group'>
                      <label className='flex text-app-secondary font-semibold mb-3 items-center gap-2'>
                        <FaUser className='text-app-primary' />
                        Your Name
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          placeholder='Enter your full name'
                          className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-app-primary/20 ${errors.name
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
                          <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
                            <HiX className='text-red-500' size={20} />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                          <HiX size={16} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className='group'>
                      <label className='flex text-app-secondary font-semibold mb-3 items-center gap-2'>
                        <FaEnvelope className='text-app-primary' />
                        Your Email
                      </label>
                      <div className='relative'>
                        <input
                          type='email'
                          placeholder='Enter your email address'
                          className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-app-primary/20 ${errors.email
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
                          <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
                            <HiX className='text-red-500' size={20} />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                          <HiX size={16} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className='group'>
                      <label className='block text-app-secondary font-semibold mb-3'>
                        Your Message
                      </label>
                      <div className='relative'>
                        <textarea
                          placeholder='Tell us how we can help you...'
                          rows={6}
                          className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-app-primary/20 resize-none ${errors.message
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
                          <div className='absolute top-4 right-4'>
                            <HiX className='text-red-500' size={20} />
                          </div>
                        )}
                      </div>
                      {errors.message && (
                        <p className='text-red-500 text-sm mt-2 flex items-center gap-2'>
                          <HiX size={16} />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className='pt-4'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`w-full relative overflow-hidden font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed text-white scale-95"
                            : "bg-gradient-to-r from-app-primary to-app-secondary text-white hover:shadow-2xl hover:shadow-app-primary/30 hover:-translate-y-1 active:scale-95"
                          }`}>
                        {isSubmitting && (
                          <div className='absolute inset-0 bg-white/20 animate-pulse'></div>
                        )}
                        <span className='relative flex items-center justify-center gap-3'>
                          {isSubmitting ? (
                            <>
                              <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <FaEnvelope />
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
          </div>
        </div>
      </section>

      {/* Toast Notification for success and error */}
      {showToast && (
        <div className='fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] max-w-sm w-full mx-4'>
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toastType === "error"
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
