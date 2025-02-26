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

export const get_lat_long = async (address) => {
  const api_key = "AIzaSyDyezdJfN8YVgq52EaCOWVTNQg8cTYZM44";
  const encode_address = encodeURIComponent(address); // encodeURIComponent() allows to send thru URL
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encode_address}&key=${api_key}`;

  const response = UrlFetchApp.fetch(url); // makes an HTTP request to given URL, returns raw data returned
  const data = JSON.parse(response.getContentText()); // converts HTTP to string then JS obj

  if (data.status === "OK") {
    // data contains array of formatted_address, location_type, "place_id"
    // results contains the formated address, and lat / lng in an location object in a geometry obj
    const location = data.results[0].geometry.location;
    return [location.lat, location.lng]; // returns coords as an array
  } else {
    return { Error: "Invalid address" };
  }
};
