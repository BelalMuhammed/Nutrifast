import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/Axios";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
const ProductReview = ({ productId }) => {
  // Only use localStorage for user authentication
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("currentUser");
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(null);
    }
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
  const [rating, setRating] = useState(0);

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
      setRating(0);
    } catch {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mt-8'>
      <h2 className='text-2xl font-bold mb-4 text-green-700'>
        Product Reviews
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && (!reviews || reviews.length === 0) && (
        <p className='text-gray-500'>No reviews yet.</p>
      )}
      {reviews && reviews.length > 0 && (
        <ul className='mb-6'>
          {reviews.map((review, idx) => (
            <li key={idx} className='border-b py-3'>
              <div className='flex items-center mb-1'>
                <span className='font-semibold mr-2'>{review.username}</span>
                <span className='flex text-yellow-500'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? "" : "opacity-30"}
                    />
                  ))}
                </span>
              </div>
              <p className='text-gray-700'>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        {user && typeof user === "object" && user.username ? (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block font-medium mb-1'>Your Rating</label>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`cursor-pointer text-2xl ${
                      i < rating ? "text-yellow-500" : "text-gray-300"
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
              <label className='block font-medium mb-1'>Your Comment</label>
              <textarea
                {...register("comment", { required: "Comment is required" })}
                className='w-full border rounded p-2'
                rows={3}
              />
              {errors.comment && (
                <span className='text-red-500 text-sm'>
                  {errors.comment.message}
                </span>
              )}
            </div>
            <button
              type='submit'
              className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
              disabled={loading || rating === 0}>
              {loading ? "Submitting..." : "Add Review"}
            </button>
          </form>
        ) : (
          <p className='text-gray-500'>Please log in to add a review.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
