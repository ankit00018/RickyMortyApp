// Custom hook to fetch episodes based on name search input

import { useEffect, useState } from "react";
import axios from "axios";

const useEpisodes = (search) => {
  const [episodes, setEpisodes] = useState([]); // stores the filtered episodes
  const [loading, setLoading] = useState(true); // true while fetching API
  const [error, setError] = useState(""); // used to display feedback if fetch fails

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        // Fetch episode data filtered by search term
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode/?name=${search}`
        );
        setEpisodes(res.data.results); // update episodes if API call is successful
        setError(""); // clear any previous error state
      } catch (err) {
        // Handle cases where no episodes are returned or error occurs
        setEpisodes([]);
        setError("No episode data found");
      }
      setLoading(false);
    };

    // execute fetch on initial render or when search changes
    fetchEpisodes();
  }, [search]);

  // Return episodes array + loading state + error state to caller component
  return { episodes, loading, error };
};

export default useEpisodes;
