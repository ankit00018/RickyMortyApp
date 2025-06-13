import { useEffect, useState } from "react";
import { fetchLocationsByName } from "../services/api.js"; // centralized API call

// Custom React Hook to fetch location data by search term
const useLocations = (search) => {
  const [locationData, setLocationData] = useState([]); // holds list of locations
  const [loading, setLoading] = useState(true); // indicates loading status
  const [error, setError] = useState(""); // stores error message

  useEffect(() => {
    // Fetch location data filtered by search name
    const fetchData = async () => {
      setLoading(true); // set loading true before API call
      try {
        const results = await fetchLocationsByName(search);
        setLocationData(results); // set fetched location data
        setError(""); // reset error
      } catch (err) {
        setLocationData([]); // clear data if fetch fails
        setError("No location found."); // show meaningful error
      }
      setLoading(false); // end loading indicator
    };

    // Trigger the fetch on initial render or when search value changes
    fetchData();
  }, [search]);

  // Return location data, loading and error for consumer component
  return { locationData, loading, error };
};

export default useLocations;
