const interestsList = [
  'Building',
  'Cars',
  'Creative Arts',
  'Gaming',
  'Literature',
  'Music',
  'Business',
  'Chilling',
  'Fitness',
  'Health',
  'Mastermind',
  'New Experiences',
];

const coordinates = [
  { latitude: 42.475435, longitude: -83.244421 },
  { latitude: 42.465336, longitude: -83.194542 },
  { latitude: 42.430158, longitude: -83.239486 },
  // Add more coordinates as needed
];

const fontSizes = {
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
};


const getAddressCoordinates = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    // Make an HTTP request to the Nominatim API
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      // Extract latitude and longitude from the first result
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      // Handle error if no results
      console.error('No results found for the address:', address);
      return null;
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return null;
  }
};

const MAPBOX_TOKEN_API = 'pk.eyJ1IjoiYmVudXBpbiIsImEiOiJjbHc1b3F1dHMxaXJxMm5xejEzM2t4ejBoIn0.3JekJOf-HMhVkGC0W6Krdg'

export { interestsList, coordinates, fontSizes, getAddressCoordinates, MAPBOX_TOKEN_API };

