// This component displays all episodes list in grid format

import { useState } from "react";
import useEpisodes from "../hooks/useEpisode";
import gridStyles from "../styles/grid.module.css";
import inputStyles from "../styles/input.module.css";
import cardStyles from "../styles/card.module.css";
import containerStyles from "../styles/container.module.css";

const Episodes = () => {
  const [search, setSearch] = useState(""); // Local state for search input
  const { episodes, loading, error } = useEpisodes(search); // Local state for search input

  return (
    <div className={containerStyles.container}>
      <h2>Episodes</h2>
      {/* Search input to filter episodes by name */}
      <input
        type="text"
        placeholder="Search episode..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={inputStyles.input}
      />

      {/* Conditional rendering for UI feedback */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={gridStyles.grid} style={{color:"black"}}>
          {episodes.map((ep) => (
            <div key={ep.id} className={cardStyles.card}>
              <div className={cardStyles.cardContent}>
                <h3 className={cardStyles.cardTitle}>{ep.name}</h3>
                <p className={cardStyles.cardDetails}>
                  <strong>Air Date:</strong> {ep.air_date}
                </p>
                <p className={cardStyles.cardDetails}>
                  <strong>Episode:</strong> {ep.episode}
                </p>
                <p className={cardStyles.cardDetails}>
                  <strong>Characters:</strong> {ep.characters.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Episodes;
