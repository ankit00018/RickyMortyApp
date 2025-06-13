// This page displays all feched character(using characterCard) in grid format

import React, { useState } from "react";
import ErrorBoundary from "../utils/ErrorBoundary";

// These components will only be loaded when needed (when rendered), reducing bundle size.
const CharacterCard = React.lazy(() => import("../components/CharacterCard"));
const FilterBar = React.lazy(() => import("../components/FilterBar"));
const SearchBar = React.lazy(() => import("../components/SearchBar"));

import useCharacterData from "../hooks/useCharacterData";
import useDebounce from "../hooks/useDebounce";
import buttonStyles from "../styles/button.module.css";
import gridStyles from "../styles/grid.module.css"
import containerStyles from "../styles/container.module.css";
import { Suspense } from "react";

const Home = () => {
  // Initialize filter values
  const [filters, setFilters] = useState({
    status: "",
    gender: "",
    location: "",
    episode: "",
    species: "",
    type: "",
  });
  const [search, setSearch] = useState(""); // Input text for character search
  const [page, setPage] = useState(1); // For pagination (load more)
  const debounceSearch = useDebounce(search,1000)

  // Fetch character data using filters, search term, and current page
  const { character, loading, hasMore } = useCharacterData(
    filters,
    debounceSearch,
    page
  );

  // Function to load next page when "Load More" is clicked
  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className={containerStyles.container}>
      {/* Top search bar for character names */}
      <ErrorBoundary fallback={<div>Failed to load Search Bar.</div>}>
        <Suspense fallback={<div>Loading Search Bar...</div>}>
          <SearchBar value={search} onChange={setSearch} />
        </Suspense>
      </ErrorBoundary>
      {/* Filters like gender, status, species, etc. */}
        <ErrorBoundary fallback={<div>Failed to load Filter Bar.</div>}>
        <Suspense fallback={<div>Loading Filter Bar...</div>}>
          <FilterBar filters={filters} setFilters={setFilters} />
        </Suspense>
      </ErrorBoundary>

      {/* Main character grid display */}
       <ErrorBoundary fallback={<div>Failed to load characters.</div>}>
        <Suspense fallback={<div>Loading Characters...</div>}>
          <div className={gridStyles.grid}>
            {loading && page === 1 ? (
              <p>Loading...</p>
            ) : character.length > 0 ? (
              character.map((c) => (
                <CharacterCard key={`${c.id}-${page}`} character={c} />
              ))
            ) : (
              <p>No characters found.</p>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* Button to load more characters on next page */}
      {hasMore && !loading && character.length > 0 && (
        <button onClick={loadMore} className={buttonStyles.button}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
