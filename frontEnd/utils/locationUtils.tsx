export const getAddressFromCoordinates = async (latitude, longitude) => {
  const apiKey = "AIzaSyDyezdJfN8YVgq52EaCOWVTNQg8cTYZM44";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const address = data.results[0].formatted_address;
      console.log("Formatted Address: ", address);
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

export const getLiveLocation = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude", latitude, "Longitude", longitude);

        const address = await getAddressFromCoordinates(latitude, longitude);
        // alert(`Your current address is: ${address}`);
        resolve(address);
      },
      (error) => {
        console.error("Unable to get location", error);
        alert(
          "Unable to retrieve location, please check your browswer permissions",
        );
        reject(error);
      },
    );
  });
};

export const get_distance_between_addresses = async (
  jobSeekerAddress: string,
  serviceProviderAddress: string,
) => {
  // encodeURI is used to safely encode the email strings for use in a URL
  const url = `http://127.0.0.1:5000/getDistance/${encodeURI(jobSeekerAddress)}/${encodeURI(serviceProviderAddress)}`;

  // Define options for the fetch request
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTPS error! status: $(response.status)`);
    }

    // Parse data from JSON result
    const data = await response.json();
    return data.distance;
  } catch (error) {
    console.error("Error:", error);
  }
};
