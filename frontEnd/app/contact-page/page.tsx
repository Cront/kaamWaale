// contact-page/page.tsx
import type React from "react";
import { ServiceProvider } from "../results/page";

// Interface for the props that the ContactModal component accepts
interface ModalProps {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  provider: ServiceProvider | null; // The selected service provider's details
}

// Functional component for the contact modal
const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose, provider }) => {
  // If the modal is not open or there is no provider selected, render nothing
  if (!isOpen || !provider) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        {/* Display selected provider's name and phone number */}
        <p className="mb-2">Name: {provider.name}</p>
        <p className="mb-4">Phone Number: {provider.phoneNumber}</p>
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

export default ContactModal;
