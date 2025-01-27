"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLiveLocation } from "../../utils/locationUtils";
import Layout from "../components/layout";
import React from "react";

export default function ProvideService() {
  // State for form inputs
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rate, setRate] = useState("");
  const router = useRouter();

  const handleGetLiveLocation = async () => {
    try {
      const locationAddress = await getLiveLocation();
      setAddress(locationAddress);
    } catch (error) {
      console.error("Error getting live location", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    console.log("Service provider details:", {
      name,
      serviceType,
      location,
      phone,
      email,
    });
    router.push("/provider-confirmation");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Provide a Service</h1>
        <p className="text-xl mb-8">Register as a Service Provider</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-left">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Service type selection */}
          <div className="mb-4">
            <label htmlFor="serviceType" className="block mb-2 text-left">
              Service Type:
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
            <label htmlFor="fullAddress" className="block mb-2 text-left">
              Full address (enter manually or click Get Live Location):
            </label>
            <input
              type="text"
              id="fullAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Full address"
              required
            />
          </div>

          {/* Phone number input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-left">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-left">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Rate input */}
          <div className="mb-4">
            <label htmlFor="rate" className="block mb-2 text-left">
              Rate (Daily):
            </label>
            <input
              type="rate"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => handleGetLiveLocation()}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-2"
          >
            Get Live Location
          </button>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Register as Provider
          </button>
        </form>
      </div>
    </Layout>
  );
}
