import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Rating, RatingStar } from "flowbite-react";

export default function ProductReview({ productId, reviews }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setSubmitting(true);
    // TODO: Dispatch add review action here
    setTimeout(() => {
      setSubmitting(false);
      setNewReview({ rating: 0, text: "" });
    }, 1000);
  };

  return (
    <div className='bg-white rounded-xl shadow p-6 mt-2 w-full mx-auto'>
      <h3 className='text-xl font-bold text-app-tertiary mb-4'>
        Product Reviews
      </h3>
      <div className='space-y-6 mb-8'>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className='border-b pb-4'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='font-semibold text-app-primary'>
                  {review.userName}
                </span>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <RatingStar key={i} filled={i < review.rating} />
                  ))}
                </Rating>
              </div>
              <p className='text-gray-700 text-sm'>{review.text}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 italic'>No reviews yet.</p>
        )}
      </div>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className='border-t pt-4'>
          <div className='flex items-center gap-2 mb-2'>
            <span className='font-semibold text-app-primary'>Your Rating:</span>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <RatingStar
                  key={i}
                  filled={i < newReview.rating}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className='cursor-pointer'
                />
              ))}
            </Rating>
          </div>
          <textarea
            className='w-full border rounded p-2 mb-2 text-sm'
            rows={3}
            placeholder='Write your review...'
            value={newReview.text}
            onChange={(e) =>
              setNewReview({ ...newReview, text: e.target.value })
            }
            required
          />
          <button
            type='submit'
            className='bg-app-tertiary text-white px-4 py-2 rounded font-semibold disabled:opacity-50'
            disabled={
              submitting || newReview.rating === 0 || !newReview.text.trim()
            }>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className='text-red-500 font-semibold'>
          You must be logged in to submit a review.
        </p>
      )}
    </div>
  );
}
