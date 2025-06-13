// hooks/useCharacterData.js
import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/api"; // centralized call

const useCharacterData = (filters, search, page) => {
  const [character, setCharacter] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const data = await fetchCharacters(filters, search, page);

        setCharacter((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(!!data.info.next);
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
