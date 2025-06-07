// Custom hook to fetch location data based on a search query

import { useEffect, useState } from "react";
import axios from "axios";

const useLocations = (search) => {
  const [locationData, setLocationData] = useState([]);  // holds location results from API
  const [loading, setLoading] = useState(true);  // controls UI loading state
  const [error, setError] = useState(""); // displays a user-friendly error

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        // Send request to get locations filtered by name
        const res = await axios.get(
          `https://rickandmortyapi.com/api/location/?name=${search}`
        );
        setLocationData(res.data.results);  // store locations if successful
        setError("");
      } catch (err) {
        setLocationData([]);
        setError("No location found.");
      }
      setLoading(false);
    };

     // re-run when search query changes
    fetchLocations();
  }, [search]);


   // Expose fetched data and states to consuming components
  return { locationData, loading, error };
};

export default useLocations;
