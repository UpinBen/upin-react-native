export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export  const validatePasswordStrength = (password) => {
    // Define your password strength rules
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    // Check if password meets all rules
    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return false;
    }
    return true;
  };


  export  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  

     export const formatDateTime = (dateTime) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return dateTime.toLocaleString(undefined, options);
  };

export const searchAddress = async (query, setLocationSuggestions) => {
  try {
    // Replace the API endpoint with the Mapbox Geocoding API
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN_API}`);
    const data = await response.json();

    // Extract the relevant address information from the response
    const suggestions = data.features.map((feature) => ({
      display_name: feature.place_name,
      // Add other relevant address fields here
    }));

    setLocationSuggestions(suggestions);
  } catch (error) {
    console.error('Error searching address:', error);
    setLocationSuggestions([]);
  }
};