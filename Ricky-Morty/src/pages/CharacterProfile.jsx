// This component displays a full profile of a single character.
// It fetches the data based on the `id` from the route params.

import { useParams } from "react-router-dom";
import useCharacterProfile from "../hooks/useCharacterProfile";

const CharacterProfile = () => {
  const { id } = useParams();// Get the character ID from the URL
  const { character, episodes, loading } = useCharacterProfile(id);// Custom hook fetches character + episodes

    // While data is still being fetched, or no character is returned, show loading message
  if (loading || !character) return <p>Loading...</p>;

  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p><strong>Status: </strong>{character.status}</p>
      <p><strong>Species: </strong>{character.species}</p>
      <p><strong>Gender: </strong>{character.gender}</p>

       {/* Only show 'type' if it's not empty */}
      {character.type && <p><strong>Type: </strong>{character.type}</p>}

      <hr />

       {/* Display character's origin information */}
      <h3>Origin</h3>
      <p><strong>Name: </strong>{character.origin.name}</p>

       {/* Display current location info */}
      <h3>Location</h3>
      <p><strong>Name: </strong>{character.location.name}</p>

      <hr />
       {/* List all episodes this character appeared in */}
      <h3>Episodes</h3>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            {episode.name} (Air date: {episode.air_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterProfile;
