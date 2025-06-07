// Custom React Hook to fetch characters from the Rick and Morty API
// Takes in filters, search input, and current page number

import { useEffect, useState } from "react";
import axios from "axios";

const useCharacterData = (filters, search, page) => {
  const [character, setCharacter] = useState([]); // holds list of characters
  const [hasMore, setHasMore] = useState(true); // tracks if there's more data for pagination
  const [loading, setLoading] = useState(true); // indicates loading state

  useEffect(() => {
    // Fetch characters based on filters, search query, and pagination
    const fetchCharacter = async () => {
      setLoading(true); // start loading before API call

      // Construct query params using URLSearchParams for structure URL
      const params = new URLSearchParams({
        page,
        name: search,
        status: filters.status,
        gender: filters.gender,
        species: filters.species,
        type: filters.type,
      });

      if (filters.location) params.append("location", filters.location);
      if (filters.episode) params.append("episode", filters.episode);

      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/?${params.toString()}`
        );

        // If it's the first page, reset data — otherwise, append (infinite scroll logic)
        setCharacter((prev) =>
          page === 1 ? res.data.results : [...prev, ...res.data.results]
        );

        // Update pagination state based on response
        setHasMore(!!res.data.info.next);
      } catch (err) {
        // If API call fails, reset characters and stop pagination
        setCharacter([]);
        setHasMore(false);
        console.log("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fire the fetch function whenever dependencies change
    fetchCharacter();
  }, [filters, search, page]);

  // Return useful data to consuming components
  return { character, loading, hasMore };
};

export default useCharacterData;
