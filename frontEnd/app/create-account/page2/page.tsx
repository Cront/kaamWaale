"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { getLiveLocation } from "../../utils/locationUtils";
import Layout from "../../components/layout";
import React from "react";

export default function CreateAccountSecond() {
  // State for form inputs
  const [account_type, set_account_type] = useState("");
  const [service_type, set_service_type] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [show_service_type, set_show_service_type] = useState(false);
  const router = useRouter();

  const name = useSearchParams().get("name") || "";
  const date_of_birth = useSearchParams().get("date_of_birth") || "";
  const gender = useSearchParams().get("gender") || "";
  const address = useSearchParams().get("address") || "";
  const phone_number = useSearchParams().get("phone_number") || "";

  // const handleGetLiveLocation = async () => {
  //   try {
  //     const locationAddress = await getLiveLocation();
  //     set_address(locationAddress);
  //   } catch (error) {
  //     console.error("Error getting live location", error);
  //   }
  // };

  // const handle_show_service_type = () => {
  //   if (account_type === "service_provider") {
  //     set_show_service_type(true);
  //   } else {
  //     set_show_service_type(false);
  //   }

  // Automatically show the service type select when account_type changes
  useEffect(() => {
    if (account_type === "service_provider") {
      set_show_service_type(true);
    } else {
      set_show_service_type(false);
    }
  }, [account_type]); // This runs whenever account_type changes

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm_password) {
      alert("Passwords do not match. Please try again");
      return;
    }

    if (password.length < 8) {
      alert(
        "Password length too short. Please make password at least eight characters",
      );
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      alert(
        "Password must have one lowercase character and one uppercase character",
      );
      return;
    }

    const data = {
      name,
      date_of_birth,
      gender,
      address,
      phone_number,
      account_type,
      service_type,
      email,
      password,
    };

    const url = "http://127.0.0.1:5000/create_service_provider";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("Server returned an error: " + errorData.message);
      } else {
        router.push("/provider-confirmation");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Create Account</h1>
        <p className="text-xl mb-8">Almost done</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 text-left">
              Account Type
            </label>
            <select
              id="gender"
              value={account_type}
              onChange={(e) => set_account_type(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select account type</option>
              <option value="service_provider">Service Provider</option>
              <option value="job_seeker">Job Seeker</option>
            </select>
          </div>

          {/* Service type selection */}
          {show_service_type && (
            <div className="mb-4">
              <label htmlFor="service_type" className="block mb-2 text-left">
                Service Type:
              </label>
              <select
                id="service_type"
                value={service_type}
                onChange={(e) => set_service_type(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a service</option>
                <option value="peon">Peon (Chowkidaar)</option>
                <option value="maid">Maasi (Maid)</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          )}

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

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-left">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-left">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => set_confirm_password(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
