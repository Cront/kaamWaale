"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import React from "react";

export default function FindService() {
  // State for form inputs
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/results?type=${serviceType}&location=${location}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Find a Service</h1>
        <p className="text-xl mb-8">Find Trusted Help in Your Area</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Service type selection */}
          <div className="mb-4">
            <label htmlFor="serviceType" className="block mb-2 text-left">
              {"I'm looking for a:"}
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a service</option>
              <option value="peon">Peon (Chowkidaar)</option>
              <option value="maid">Maasi (Maid)</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          {/* Location input */}
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2 text-left">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your area or city"
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
    </Layout>
  );
}
