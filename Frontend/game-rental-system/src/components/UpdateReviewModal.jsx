import { useState } from "react";

export default function UpdateReviewModal({ accountID, gameID, onClose, gameName, reviewID, setProfileReviews }) {

  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/update-review?reviewID=${reviewID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "accountID" : accountID,
            "gameID" : gameID,
            "starRating" : starRating,
            "comment" : comment
        })
      });
      
      const data = await response.json();
      alert(data.message);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    finally {
        setProfileReviews(prevReviews => prevReviews.map(review => review.reviewID === reviewID ? { ...review, starRating, comment } : review));
    }
    
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Rate {gameName}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${star <= starRating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setStarRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="mt-4 w-full border border-gray-300 rounded-md p-2"
            placeholder="Leave a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        \
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}