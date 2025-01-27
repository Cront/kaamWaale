"use client";

import React from "react";
import type { Reviews } from "../results/page"; // Import the type definition for Reviews

// Define the props interface for the ReviewModal component
interface ModalProps {
  isOpen: boolean; // Determines whether the modal is open or closed
  onClose: () => void; // Function to close the modal
  reviews: Reviews[]; // Array of review objects to display in the modal
}

// Define the ReviewModal component
const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, reviews }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Modal header */}
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {/* Render each review in the reviews array */}
        {reviews.map((review, index) => (
          <div
            key={index} // Unique key for each review
            className="mb-4 border-b pb-4 last:border-b-0"
          >
            {/* Profile and reviewer details */}
            <div className="flex items-center mb-2">
              <img
                src={review.profilePicture || "/placeholder.svg"} // Fallback to placeholder image if profile picture is missing
                alt={`${review.reviewerName}'s profile`} // Accessible alt text for the profile image
                className="w-10 h-10 rounded-full mr-3" // Styling for the profile image
              />
              <div>
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  {review.numberOfReviewsGiven} reviews given
                </p>
              </div>
            </div>

            {/* Rating details */}
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{review.rating}/10</span>
            </div>

            {/* Review comment */}
            <p>{review.comment}</p>
          </div>
        ))}

        {/* Close button */}
        <button
          onClick={onClose} // Trigger the onClose function to close the modal
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
