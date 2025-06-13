// This component displays all location list in grid format

import { useState } from "react";
import useLocations from "../hooks/useLocations";
import gridStyles from "../styles/grid.module.css";
import inputStyles from "../styles/input.module.css";
import cardStyles from "../styles/card.module.css";
import containerStyles from "../styles/container.module.css";
import useDebounce from "../hooks/useDebounce";

const Locations = () => {
  const [search, setSearch] = useState(""); // Search input state
  const debounceSearch = useDebounce(search,500)
  const { locationData, loading, error } = useLocations(debounceSearch); // Hook to fetch location data

  return (
    <div className={containerStyles.container}>
      <h2>Location</h2>
      {/* Search bar to filter locations by name */}
      <input
        type="text"
        placeholder="Search Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={inputStyles.input}
      />

      {/* Handle loading, error, and data states */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={gridStyles.grid} style={{ color: "black" }}>
          {/* Display a card for each location */}
          {locationData.map((location) => (
            <div key={location.id} className={cardStyles.card}>
              <div className={cardStyles.cardContent}>
                <h3 className={cardStyles.cardTitle}>{location.name}</h3>
                <p className={cardStyles.cardDetails}>
                  <strong>Type:</strong> {location.type}
                </p>
                <p className={cardStyles.cardDetails}>
                  <strong>Dimension:</strong> {location.dimension}
                </p>
                <p className={cardStyles.cardDetails}>
                  <strong>Residents:</strong> {location.residents.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
