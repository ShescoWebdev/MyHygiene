import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PageWrapper from '../components/PageWrapper';
import API from '../api';

const ReviewPage = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.post('/reviews', { name, rating, comment });
      
      Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Your review has been successfully submitted.',
        confirmButtonColor: '#f0b000'
      });

      // Clear the form
      setName('');
      setRating(5);
      setComment('');
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while submitting your review.',
        confirmButtonColor: '#f0b000'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="bg-[#faf6e8] min-h-screen pt-28 pb-16 px-4 flex justify-center items-center">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">How did we do?</h1>
            <p className="text-gray-600">We appreciate your feedback and use it to improve our services.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0b000]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-transform hover:scale-110 ${rating >= star ? 'text-[#f0b000]' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0b000] resize-none"
                placeholder="Tell us about your experience..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-[#f0b000] text-black font-bold text-lg rounded-xl hover:bg-yellow-500 transition-colors shadow-md disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReviewPage;