import React from "react";
import { useParams } from "next/navigation";

export interface Reviews {
  id: number; // match ServiceProvider id
  reviewerName: string;
  rating: number;
  numberOfReviewsGiven: number;
  profilePicture: string;
  comment: string;
}

const fetchReviews = (serviceProviderId: number): Reviewer[] => {
  const allReviews: Reviews[] = [
    // Filza Abidi's Reviews (Average Rating: 9.1)
    {
      id: 2, // Filza's ID
      profilePicture: "user1.png",
      reviewerName: "Alice Johnson",
      numberOfReviewsGiven: 18,
      comment: "Fantastic service! Highly professional.",
      rating: 10,
    },
    {
      id: 2,
      profilePicture: "user2.png",
      reviewerName: "Bob Smith",
      numberOfReviewsGiven: 12,
      comment: "Very courteous and reliable.",
      rating: 9,
    },
    {
      id: 2,
      profilePicture: "user3.png",
      reviewerName: "Catherine Lee",
      numberOfReviewsGiven: 8,
      comment: "Would absolutely recommend her.",
      rating: 10,
    },
    {
      id: 2,
      profilePicture: "user4.png",
      reviewerName: "David Brown",
      numberOfReviewsGiven: 5,
      comment: "Great experience but room for improvement in communication.",
      rating: 8,
    },
    {
      id: 2,
      profilePicture: "user5.png",
      reviewerName: "Evelyn Wright",
      numberOfReviewsGiven: 20,
      comment: "Exceptional service! I’m very satisfied.",
      rating: 9,
    },

    // Hasan Abidi's Reviews (Average Rating: 8.2)
    {
      id: 1, // Hasan's ID
      profilePicture: "user6.png",
      reviewerName: "Franklin Moore",
      numberOfReviewsGiven: 10,
      comment: "Very professional and dependable.",
      rating: 9,
    },
    {
      id: 1,
      profilePicture: "user7.png",
      reviewerName: "Grace Hill",
      numberOfReviewsGiven: 14,
      comment: "Good experience, but slightly delayed response.",
      rating: 8,
    },
    {
      id: 1,
      profilePicture: "user8.png",
      reviewerName: "Henry Taylor",
      numberOfReviewsGiven: 7,
      comment: "Helpful and efficient service.",
      rating: 8,
    },
    {
      id: 1,
      profilePicture: "user9.png",
      reviewerName: "Isabella Green",
      numberOfReviewsGiven: 5,
      comment: "Really great! Highly recommend.",
      rating: 8,
    },

    // Syed Abidi's Reviews (Average Rating: 2.3)
    {
      id: 3, // Syed's ID
      profilePicture: "user10.png",
      reviewerName: "Jack White",
      numberOfReviewsGiven: 2,
      comment: "Not satisfied. Poor communication.",
      rating: 2,
    },
    {
      id: 3,
      profilePicture: "user11.png",
      reviewerName: "Karen Black",
      numberOfReviewsGiven: 3,
      comment: "Service quality was below expectations.",
      rating: 3,
    },
    {
      id: 3,
      profilePicture: "user12.png",
      reviewerName: "Leo Martinez",
      numberOfReviewsGiven: 1,
      comment: "Disappointing experience overall.",
      rating: 2,
    },
    {
      id: 3,
      profilePicture: "user13.png",
      reviewerName: "Mia Lopez",
      numberOfReviewsGiven: 5,
      comment: "Needs a lot of improvement to meet basic standards.",
      rating: 2,
    },
  ];

  export default function ReviewsPopUp() {
    const params = useParams();
    const serviceProviderId = Array.isArray(params.id)
      ? parseInt(params.id[0], 10)
      : parseInt(params.id || "0", 10);

    const providerReviews = allReviews.filter(
      (review) => review.id === serviceProviderId,
    );

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        <ul className="list-disc pl-5">
          {providerReviews.map((review, index) => (
            <li key={index} className="mb-2">
              <img
                src={review.profilePicture}
                alt={`${review.reviewerName}'s profile`}
                className="w-10 h-10 rounded-full inline mr-2"
              />
              <strong>{review.reviewerName}</strong> (
              {review.numberOfReviewsGiven} reviews): {review.comment}
              <p>Rating: {review.rating}/10</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
