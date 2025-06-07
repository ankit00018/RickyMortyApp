// Custom hook to fetch full character profile + episode data using character ID

import { useEffect, useState } from "react";
import axios from "axios";

const useCharacterProfile = (id) => {
  const [character, setCharacter] = useState(null); // holds main character data
  const [episodes, setEpisodes] = useState([]); // holds all episodes character appears in
  const [loading, setLoading] = useState(true); // loading state for feedback

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        //Fetch the selected character by ID
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(res.data);

        //Extract all episode IDs from character data
        const episodeIds = res.data.episode.map((url) => url.split("/").pop());

        //Fetch all episodes in a single request (Rick & Morty API allows batch fetching)
        const episodeRes = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`
        );

        //Normalize response — if it's a single episode, wrap in array
        setEpisodes(
          Array.isArray(episodeRes.data) ? episodeRes.data : [episodeRes.data]
        );
      } catch (err) {
        // handle any fetch errors
        console.log("Error fetching profile:", err);
      } finally {
        //success or error, we're done loading
        setLoading(false);
      }
    };

    // Re-run this effect if character ID changes
    fetchCharacter();
  }, [id]);

  // Return full character object + episodes + loading state
  return { character, episodes, loading };
};

export default useCharacterProfile;
