"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import type React from "react";

export default function FindService() {
  // State for form inputs
  const [email, set_email] = useState("");
  const [original_password, set_original_password] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      original_password,
    };

    const url = "http://127.0.0.1:5000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // data being sent to server
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("Server returned an error: " + errorData.message);
      } else {
        alert("Logged in!");
        const user_account = await response.json();

        if (user_account === "service_provider") {
          // TODO: different login for service_provider
          console.log(user_account);
        } else {
          console.log(user_account);
          // TODO: different login for job_seeker
          // router.push(`/job_seeker/page?user_account=${user_account}`);
          router.push("/job-seeker");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <p className="text-xl mb-8">Login to your account</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Service type selection */}
          <div className="mb-4">
            <label htmlFor="serviceType" className="block mb-2 text-left">
              Email
            </label>
            <input
              type="text"
              id="text"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Account email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullAddress" className="block mb-2 text-left">
              Password
            </label>
            <input
              type="password"
              id="fullAddress"
              value={original_password}
              onChange={(e) => set_original_password(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Account password"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
