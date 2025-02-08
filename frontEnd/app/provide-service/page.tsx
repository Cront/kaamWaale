"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLiveLocation } from "../../utils/locationUtils";
import Layout from "../components/layout";
import React from "react";

export default function ProvideService() {
  // State for form inputs
  const [address, set_address] = useState("");
  const [name, set_name] = useState("");
  const [service_provided, set_service_provided] = useState("");
  const [date_of_birth, set_date_of_birth] = useState("");
  const [gender, set_gender] = useState("");
  // const [location, setLocation] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [email, set_email] = useState("");
  const [rate, set_rate] = useState("");
  const router = useRouter();

  const handleGetLiveLocation = async () => {
    try {
      const locationAddress = await getLiveLocation();
      set_address(locationAddress);
    } catch (error) {
      console.error("Error getting live location", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      date_of_birth,
      gender,
      service_provided,
      address,
      phone_number,
      email,
      rate,
    };

    const url = "http://127.0.0.1:5000/create_service_provider";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      router.push("/provider-confirmation");
    }
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
              onChange={(e) => set_name(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Date of birth input */}
          <div className="mb-4">
            <label htmlFor="date_of_birth" className="block mb-2 text-left">
              Date of Birth
            </label>
            <input
              type="text"
              id="date_of_birth"
              value={date_of_birth}
              onChange={(e) => set_date_of_birth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Year-Month-Day"
              required
            />
          </div>

          {/* Gender input */}
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 text-left">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => set_gender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Service type selection */}
          <div className="mb-4">
            <label htmlFor="service_type" className="block mb-2 text-left">
              Service Type:
            </label>
            <select
              id="service_type"
              value={service_provided}
              onChange={(e) => set_service_provided(e.target.value)}
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
            <label htmlFor="full_address" className="block mb-2 text-left">
              Full Address (enter manually or click Get Live Location):
            </label>
            <input
              type="text"
              id="full_address"
              value={address}
              onChange={(e) => set_address(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Full address"
              required
            />
          </div>

          {/* Phone number input */}
          <div className="mb-4">
            <label htmlFor="phone_number" className="block mb-2 text-left">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone_number"
              value={phone_number}
              onChange={(e) => set_phone_number(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Phone Number"
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
              onChange={(e) => set_email(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Email Address"
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
              onChange={(e) => set_rate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Rate"
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
