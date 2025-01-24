"use client";

import React from "react";
// import { useParams } from "next/navigation";
import { ModalProps as OriginalModalProps } from "../contact-page/page.tsx";
import { Reviews } from "../results/page.tsx";

interface ModalProps extends Omit<OriginalModalProps, "provider"> {
  provider: Reviews[] | null;
}

// ReviewModal Component
const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, provider }) => {
  if (!isOpen || !provider) return null; // Render nothing if modal is closed or provider is null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {/* Display the reviews */}
        <ul className="list-disc pl-5 text-left">
          {provider.map((reviewer, index) => (
            <li key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={reviewer.profilePicture || "/placeholder.svg"}
                  alt={`${reviewer.reviewerName}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <strong>{reviewer.reviewerName}</strong>
                  <p>Rating: {reviewer.rating}/10</p>
                </div>
              </div>
              <p>{reviewer.comment}</p>
            </li>
          ))}
        </ul>

        {/* Close button for the modal */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
