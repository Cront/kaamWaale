import Link from "next/link";
import Layout from "../components/layout";
import React from "react";

export default function ProviderConfirmation() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        {/* Confirmation message */}
        <h1 className="text-4xl font-bold mb-4">Thank You for Registering!</h1>
        <p className="text-xl mb-8">
          Your information has been submitted successfully.
        </p>
        <p className="mb-8">
          Our team will review your application and contact you soon.
        </p>
        {/* Return to home button */}
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
}
