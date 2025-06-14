// hooks/useCharacterData.js
import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/api"; // centralized call

const useCharacterData = (filters, search, page) => {
  const [character, setCharacter] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const filterByLocationAndEpisode = (characters, location, episode) => {
    return characters.filter((char) => {
      const locationMatch = location
        ? char.location.name.toLowerCase().includes(location.toLowerCase())
        : true;
      const episodeMatch = episode
        ? char.episode.some((epUrl) =>
            epUrl.toLowerCase().includes(episode.toLowerCase())
          )
        : true;
      return locationMatch && episodeMatch;
    });
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const data = await fetchCharacters(filters, search, page);

        let filteredResults = data.results;
        // filter location and episode client-side
        filteredResults = filterByLocationAndEpisode(
          filteredResults,
          filters.location,
          filters.episode
        );

        setCharacter((prev) =>
          page === 1 ? filteredResults : [...prev, ...filteredResults]
        );
        setHasMore(!!data.info.next && filteredResults.length > 0);
      } catch (err) {
        setCharacter([]);
        setHasMore(false);
        console.log("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [filters, search, page]);

  return { character, loading, hasMore };
};

export default useCharacterData;
