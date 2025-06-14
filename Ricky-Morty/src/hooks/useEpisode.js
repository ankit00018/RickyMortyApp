import { useEffect, useState } from "react";
import { fetchEpisodesByName } from "../services/api.js"; 

// Custom React Hook to fetch Rick and Morty episodes by search term
const useEpisodes = (search) => {
  const [episodes, setEpisodes] = useState([]); // stores the filtered episodes
  const [loading, setLoading] = useState(true); // true while fetching API
  const [error, setError] = useState(""); // error message if fetch fails

  useEffect(() => {
    
    // Fetch episode data from API based on name
    const fetchData = async () => {
      setLoading(true); // show loading while request is pending
      try {
        const results = await fetchEpisodesByName(search);
        setEpisodes(results); // set episodes on success
        setError(""); // reset error if any
      } catch (err) {
        setEpisodes([]); // clear list if API fails
        setError("No episode data found"); // show user-friendly error
      }
      setLoading(false); // end loading state
    };

    // Execute fetch when component mounts or when search term changes
    fetchData();
  }, [search]);

  // Return episodes, loading state, and error to the component
  return { episodes, loading, error };
};

export default useEpisodes;
