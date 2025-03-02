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

export const get_distance_between_addresses = async (origin, destination) => {
  const apiKey = "AIzaSyDyezdJfN8YVgq52EaCOWVTNQg8cTYZM44";

  // URL connecting to distancematrix method of Google API
  // Takes origin and distance as param args
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin,
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      // JSON response array with origin, destination
      // rows with array within it with elements and eleemnts within it with distance and duration and status
      const distance = data.rows[0].elements[0].distance.text;
      console.log(`Distance: ${distance}`);
      return distance;
    } else {
      throw new Error("Error fetching distance data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
