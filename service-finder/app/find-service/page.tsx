"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import type React from "react";

export default function FindService() {
  // State for form inputs
  const [serviceType, setServiceType] = useState("");
  // const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [muhallah, setMuhallah] = useState("");
  // const [street, setStreet] = useState("");
  // const [houseNumber, setHouseNumber] = useState("");
  // const [closestArea, setClosestArea] = useState("");
  const router = useRouter();

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = "AIzaSyDyezdJfN8YVgq52EaCOWVTNQg8cTYZM44";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const address = data.results[0].formatted_address;
        console.log("Formatted Address: ", address);
        setAddress(address);
        return address;
      } else {
        console.error("Error fetching address:", data.status);
        alert("Couldn't fetch address. Please try again");
      }
    } catch (error) {
      console.error("Error with fetch:", error);
      alert("Failed to fetch address. Check your internet connection");
    }
  };

  const getLiveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude", latitude, "Longitude", longitude);

        const address = await getAddressFromCoordinates(latitude, longitude);
        alert(`Your current address is: ${address}`);
      },
      (error) => {
        console.error("Unable to get location", error);
        alert(
          "Unable to retrieve location, please check your browswer permissions",
        );
      },
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      type: serviceType,
      fullAddress: address,
      // country,
      // city,
      // muhallah,
      // street,
      // houseNumber,
      // closestArea,
    }).toString();
    router.push(`/results?${queryParams}`);
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
          {/* <div className="mb-4"> */}
          {/*   <label htmlFor="city" className="block mb-2 text-left"> */}
          {/*     City (شہر): */}
          {/*   </label> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     id="city" */}
          {/*     value={city} */}
          {/*     onChange={(e) => setCity(e.target.value)} */}
          {/*     className="w-full p-2 border rounded" */}
          {/*     placeholder="Enter your city" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          {/* Muhallah input */}
          {/* <div className="mb-4"> */}
          {/*   <label htmlFor="muhallah" className="block mb-2 text-left"> */}
          {/*     Muhallah (محلہ): */}
          {/*   </label> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     id="muhallah" */}
          {/*     value={muhallah} */}
          {/*     onChange={(e) => setMuhallah(e.target.value)} */}
          {/*     className="w-full p-2 border rounded" */}
          {/*     placeholder="Enter your muhallah" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          {/* Street input */}
          {/* <div className="mb-4"> */}
          {/*   <label htmlFor="street" className="block mb-2 text-left"> */}
          {/*     Street / Gali: */}
          {/*   </label> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     id="street" */}
          {/*     value={street} */}
          {/*     onChange={(e) => setStreet(e.target.value)} */}
          {/*     className="w-full p-2 border rounded" */}
          {/*     placeholder="Enter your street or gali" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          {/* House Number input */}
          {/* <div className="mb-4"> */}
          {/*   <label htmlFor="houseNumber" className="block mb-2 text-left"> */}
          {/*     House / Makan Number: */}
          {/*   </label> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     id="houseNumber" */}
          {/*     value={houseNumber} */}
          {/*     onChange={(e) => setHouseNumber(e.target.value)} */}
          {/*     className="w-full p-2 border rounded" */}
          {/*     placeholder="Enter your house or makan number" */}
          {/*     required */}
          {/*   /> */}
          {/* </div> */}
          {/* Closest known area input */}
          {/* <div className="mb-4"> */}
          {/*   <label htmlFor="closestArea" className="block mb-2 text-left"> */}
          {/*     Closest known area / Qareebi shanakht: */}
          {/*   </label> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     id="closestArea" */}
          {/*     value={closestArea} */}
          {/*     onChange={(e) => setClosestArea(e.target.value)} */}
          {/*     className="w-full p-2 border rounded" */}
          {/*     placeholder="Enter the closest known area" */}
          {/*   /> */}
          {/* </div> */}
          {/* Live location button */}
          <button
            type="button"
            onClick={() => getLiveLocation()}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-2"
          >
            Get Live Location
          </button>
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
