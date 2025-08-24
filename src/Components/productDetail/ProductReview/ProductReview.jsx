import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/Axios";
import { getCurrentUser } from "../../../lib/storage";
import { useForm } from "react-hook-form";
import { FaStar, FaUserCircle } from "react-icons/fa";
const ProductReview = ({ productId }) => {
  // Only use localStorage for user authentication
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = getCurrentUser();
    setUser(localUser);
  }, []);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(4);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        if (res.data && Array.isArray(res.data.reviews)) {
          setReviews(res.data.reviews);
        } else {
          setReviews([]);
        }
      } catch {
        setError("Failed to fetch reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      // Get current product reviews
      const productRes = await axiosInstance.get(`/products/${productId}`);
      const currentReviews = productRes.data.reviews || [];
      const newReview = {
        ...data,
        rating,
        userId: user?.id,
        username: user?.username,
      };
      // PATCH product with new reviews array
      const res = await axiosInstance.patch(`/products/${productId}`, {
        reviews: [...currentReviews, newReview],
      });
      setReviews(res.data.reviews || []);
      reset();
      setRating(4);
    } catch {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  // Show More/Show Less logic
  const [showAll, setShowAll] = useState(false);
  const REVIEWS_TO_SHOW = 3;

  return (
    <div className='flex items-start justify-center bg-white px-1 pt-2 mb-8 '>
      <div className='w-full max-w-6xl xl:max-w-7xl mx-auto bg-white '>
      
        {loading && <p className='text-app-primary'>Loading...</p>}
        {error && <p className='text-red-500 mb-2'>{error}</p>}
        
        {reviews && reviews.length > 0 && (
          <>
            <ul className='mb-8'>
              {(showAll ? reviews : reviews.slice(0, REVIEWS_TO_SHOW)).map(
                (review, idx) => (
                  <li
                    key={idx}
                    className='flex gap-3 items-start py-5 border-b border-gray-100'>
                    <div className='flex-shrink-0 w-10 h-10 rounded-full bg-app-tertiary flex items-center justify-center text-white font-bold text-lg shadow'>
                      {review.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-semibold text-app-secondary text-base'>
                          {review.username}
                        </span>
                        <span className='flex text-yellow-300'>
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? "" : "opacity-30"}
                            />
                          ))}
                        </span>
                      </div>
                      <p className='text-gray-700 text-sm leading-relaxed'>
                        {review.comment}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
            {reviews.length > REVIEWS_TO_SHOW && (
              <div className='flex justify-center mb-8'>
                <button
                  className='px-6 py-2 rounded-lg bg-app-tertiary text-white font-semibold hover:bg-app-secondary transition text-sm shadow'
                  onClick={() => setShowAll((prev) => !prev)}>
                  {showAll
                    ? "Show Less"
                    : `Show More (${reviews.length - REVIEWS_TO_SHOW})`}
                </button>
              </div>
            )}
          </>
        )}
        <div className='bg-gray-50 rounded-xl p-6 shadow-inner'>
          {user && typeof user === "object" && user.username ? (
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div>
                <label className='block font-semibold mb-2 text-app-primary'>
                  Your Rating
                </label>
                <div className='flex gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`cursor-pointer text-3xl transition-colors duration-150 ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
                {rating === 0 && (
                  <span className='text-red-500 text-sm'>
                    Please select a rating
                  </span>
                )}
              </div>
              <div>
                <label className='block font-semibold mb-2 text-app-primary'>
                  Your Comment
                </label>
                <textarea
                  {...register("comment", { required: "Comment is required" })}
                  className='w-full border border-app-secondary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-app-tertiary text-gray-700'
                  rows={3}
                  placeholder='Write your review...'
                />
                {errors.comment && (
                  <span className='text-red-500 text-sm'>
                    {errors.comment.message}
                  </span>
                )}
              </div>
              <button
                type='submit'
                className='bg-app-tertiary text-white font-semibold py-2 px-6 rounded-lg hover:bg-app-secondary transition'
                disabled={loading}>
                {loading ? "Submitting..." : "Add Review"}
              </button>
            </form>
          ) : (
            <p className='text-gray-400 text-base text-center'>
              Please log in to add a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
