// results/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

import Layout from "../components/layout";
import { useState, useEffect, Suspense } from "react";
import { get_distance_between_addresses } from "../../utils/locationUtils";
import ContactModal from "../contact-page/page";
import ReviewModal from "../reviews-page/page";
import React from "react";

// Interface defining the structure of a service provider object
export interface ServiceProvider {
  id: number;
  name: string;
  type: string;
  location: string;
  distance?: number; // DISTANCE FROM EMPLOYER TO EMPLOYEE, CALCULATE LATER
  rating: number;
  profilePicture: string;
  phoneNumber: string;
  numberOfReviews: number;
}

// Define the Reviews interface
export interface Reviews {
  id: number; // match ServiceProvider id
  reviewerName: string;
  rating: number;
  numberOfReviewsGiven: number;
  profilePicture: string;
  comment: string;
}

// Mock function to simulate fetching data (replace with an actual API call in production)
// const fetchServiceProviders = (
//   type: string,
//   location: string,
// ): ServiceProvider[] => {
//   return [
//     {
//       id: 1,
//       name: "Hasan Abidi",
//       type,
//       location: "",
//       rating: 8.1,
//       profilePicture: "hasanPfp.png",
//       phoneNumber: "(510)-766-9811",
//       numberOfReviews: 4,
//     },
//     {
//       id: 2,
//       name: "Filza Abidi",
//       type,
//       location,
//       rating: 9.4,
//       profilePicture: "filzaBajiPfp.png",
//       phoneNumber: "(309)-391-4247",
//       numberOfReviews: 5,
//     },
//     {
//       id: 3,
//       name: "Syed Abidi",
//       type,
//       location,
//       rating: 2.3,
//       profilePicture: "chotoBhaiPfp.png",
//       phoneNumber: "(309)-391-4356",
//       numberOfReviews: 4,
//     },
//   ];
// };

// Fetch reviews based on the service provider's ID
const fetchReviews = (serviceProviderId: number): Reviews[] => {
  const allReviews: Reviews[] = [
    // Filza Abidi's Reviews (Average Rating: 9.1)
    {
      id: 2,
      profilePicture: "user1.png",
      reviewerName: "Alice Johnson",
      numberOfReviewsGiven: 18,
      comment: "Fantastic service! Highly professional.",
      rating: 10,
    },
    {
      id: 2,
      profilePicture: "user2.png",
      reviewerName: "Rayfay",
      numberOfReviewsGiven: 12,
      comment: "Very courteous and reliable.",
      rating: 9,
    },
    {
      id: 2,
      profilePicture: "user3.png",
      reviewerName: "Wafa",
      numberOfReviewsGiven: 8,
      comment: "Would absolutely recommend her.",
      rating: 10,
    },
    {
      id: 2,
      profilePicture: "user4.png",
      reviewerName: "Shanwaz Shah",
      numberOfReviewsGiven: 5,
      comment: "Great experience but room for improvement in communication.",
      rating: 8,
    },
    {
      id: 2,
      profilePicture: "user5.png",
      reviewerName: "Chachi",
      numberOfReviewsGiven: 20,
      comment: "Exceptional service! I’m very satisfied.",
      rating: 9,
    },

    // Hasan Abidi's Reviews (Average Rating: 8.2)
    {
      id: 1,
      profilePicture: "user6.png",
      reviewerName: "Saalis",
      numberOfReviewsGiven: 10,
      comment: "Very professional and dependable.",
      rating: 9,
    },
    {
      id: 1,
      profilePicture: "user7.png",
      reviewerName: "Salma Hayek",
      numberOfReviewsGiven: 14,
      comment: "Good experience, but slightly delayed response.",
      rating: 8,
    },
    {
      id: 1,
      profilePicture: "user8.png",
      reviewerName: "Chucky",
      numberOfReviewsGiven: 7,
      comment: "Helpful and efficient service.",
      rating: 8,
    },
    {
      id: 1,
      profilePicture: "user9.png",
      reviewerName: "Muskan",
      numberOfReviewsGiven: 5,
      comment: "Really great! Highly recommend.",
      rating: 8,
    },

    // Syed Abidi's Reviews (Average Rating: 2.3)
    {
      id: 3,
      profilePicture: "user10.png",
      reviewerName: "Beyonce",
      numberOfReviewsGiven: 2,
      comment: "Not satisfied. Poor communication.",
      rating: 2,
    },
    {
      id: 3,
      profilePicture: "user11.png",
      reviewerName: "Bee Jaan",
      numberOfReviewsGiven: 3,
      comment: "Service quality was below expectations.",
      rating: 3,
    },
    {
      id: 3,
      profilePicture: "user12.png",
      reviewerName: "Urooj Bath-Amese",
      numberOfReviewsGiven: 1,
      comment: "Disappointing experience overall.",
      rating: 2,
    },
    {
      id: 3,
      profilePicture: "user13.png",
      reviewerName: "Dejonte",
      numberOfReviewsGiven: 5,
      comment: "Needs a lot of improvement to meet basic standards.",
      rating: 2,
    },
  ];

  // Filter reviews matching the serviceProviderId
  return allReviews.filter((review) => review.id === serviceProviderId);
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Results />
    </Suspense>
  );
}

function Results() {
  // Extract search parameters from the URL
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const jsFullAddress = searchParams.get("fullAddress") || "";

  // Fetch mock service providers data based on type and location
  // const serviceProviders = fetchServiceProviders(type, fullAddress);
  // const service_providers_real = fetchServiceProvidersReal();

  // use to set database data for service providers
  const [service_providers, set_service_providers] = useState<any[]>([]);

  // Fetch the data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/get_service_provider",
        );
        const data = await response.json();
        // console.log(data.service_providers);
        set_service_providers(data.service_providers); // Update state with real data
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on component mount

  const filtered_service_providers = service_providers.filter(
    (provider) => provider.service_type.toLowerCase() === type.toLowerCase(),
  );

  // console.log(service_providers);

  // State for modal visibility
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // State for the currently selected provider
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Function to handle "Contact" button click
  const handleContact = (provider: ServiceProvider) => {
    setSelectedProvider(provider); // Set the selected provider
    setIsContactModalOpen(true); // Open the modal
  };

  const handleReviews = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsReviewModalOpen(true);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">
        Results for {type || "types"}s near {jsFullAddress || "location error"}
      </h1>
      {/* Display service providers in a grid layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered_service_providers.map((provider) => (
          <div key={provider.id} className="border rounded p-4 shadow">
            {/* Provider Profile Picture */}
            <img
              src={provider.profile_picture || "/placeholder.svg"}
              alt={`${provider.name}'s profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <div className="text-2xl font-semibold mb-1">{provider.name}</div>
            {/* CHANGE LATER TO GET THE DISTANCE FROM ADDRESS TO EMPLOYER */}
            <p>
              Distance:{" "}
              {get_distance_between_addresses(jsFullAddress, provider.address)}
            </p>
            <p>
              Rating: {provider.rating}/10{" "}
              <span
                onClick={() => handleReviews(provider)}
                // href={"/reviews-page?user=${id}"} // ADJUST LINK TO REVIEWS PAGE
                className="text-blue-600 underline hover:text-blue-800"
              >
                ({provider.number_of_reviews_received} reviews)
              </span>
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
      {isContactModalOpen && selectedProvider && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          provider={selectedProvider}
        />
      )}
      {isReviewModalOpen && selectedProvider && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          reviews={fetchReviews(selectedProvider.id)}
        />
      )}
    </Layout>
  );
}
