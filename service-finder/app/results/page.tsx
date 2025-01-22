// results/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Layout from "../components/layout";
import { useState } from "react";
import ContactModal from "../contact-page/page";
import Link from "next/link";

// Interface defining the structure of a service provider object
export interface ServiceProvider {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: number;
  profilePicture: string;
  phoneNumber: string;
  numberOfReviews: number;
}

// Mock function to simulate fetching data (replace with an actual API call in production)
const fetchServiceProviders = (
  type: string,
  location: string,
): ServiceProvider[] => {
  return [
    {
      id: 1,
      name: "Hasan Abidi",
      type,
      location,
      rating: 8.1,
      profilePicture: "hasanPfp.png",
      phoneNumber: "(510)-766-9811",
      numberOfReviews: 55,
    },
    {
      id: 2,
      name: "Filza Abidi",
      type,
      location,
      rating: 9.4,
      profilePicture: "filzaBajiPfp.png",
      phoneNumber: "(309)-391-4247",
      numberOfReviews: 197,
    },
    {
      id: 3,
      name: "Syed Abidi",
      type,
      location,
      rating: 2.3,
      profilePicture: "chotoBhaiPfp.png",
      phoneNumber: "(309)-391-4356",
      numberOfReviews: 88,
    },
  ];
};

export default function Results() {
  // Extract search parameters from the URL
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";

  // Fetch mock service providers data based on type and location
  const serviceProviders = fetchServiceProviders(type, location);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the currently selected provider
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);

  // Function to handle "Contact" button click
  const handleContact = (provider: ServiceProvider) => {
    setSelectedProvider(provider); // Set the selected provider
    setIsModalOpen(true); // Open the modal
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">
        Results for {type || "all types"} in {location || "all locations"}
      </h1>
      {/* Display service providers in a grid layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {serviceProviders.map((provider) => (
          <div key={provider.id} className="border rounded p-4 shadow">
            {/* Provider Profile Picture */}
            <img
              src={provider.profilePicture || "/placeholder.svg"}
              alt={`${provider.name}'s profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            {/* Provider Details */}
            <h2 className="text-xl font-semibold mb-2">{provider.name}</h2>
            <p>Type: {provider.type}</p>
            <p>Location: {provider.location}</p>
            <p>
              Rating: {provider.rating}/10{" "}
              <Link
                href={""} // ADJUST LINK TO REVIEWS PAGE
                className="text-blue-600 underline hover:text-blue-800"
              >
                ({provider.numberOfReviews} reviews)
              </Link>
            </p>
            {/* Contact button */}
            <button
              onClick={() => handleContact(provider)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Contact
            </button>
          </div>
        ))}
      </div>
      {/* Render the contact modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={selectedProvider}
      />
    </Layout>
  );
}
