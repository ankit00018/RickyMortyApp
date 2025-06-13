// hooks/useCharacterProfile.js
import { useEffect, useState } from "react";
import { fetchCharacterById, fetchEpisodesByIds } from "../services/api.js";

const useCharacterProfile = (id) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const characterData = await fetchCharacterById(id);
        setCharacter(characterData);

        const episodeIds = characterData.episode.map((url) =>
          url.split("/").pop()
        );

        const episodeData = await fetchEpisodesByIds(episodeIds);
        setEpisodes(episodeData);
      } catch (err) {
        console.error("Error fetching character profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  return { character, episodes, loading };
};

export default useCharacterProfile;
