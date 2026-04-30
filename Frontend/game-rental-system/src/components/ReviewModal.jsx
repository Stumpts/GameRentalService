import { useState } from "react";

export default function ReviewModal({ accountID, gameID, onClose }) {

  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
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
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}