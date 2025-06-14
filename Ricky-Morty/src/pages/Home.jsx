// This page displays all feched character(using characterCard) in grid format

import React, { useEffect, useState } from "react";
import ErrorBoundary from "../utils/ErrorBoundary";

// These components will only be loaded when needed (when rendered), reducing bundle size.
const CharacterCard = React.lazy(() => import("../components/CharacterCard"));
import useCharacterData from "../hooks/useCharacterData";
import useDebounce from "../hooks/useDebounce";
import buttonStyles from "../styles/button.module.css";
import gridStyles from "../styles/grid.module.css";
import containerStyles from "../styles/container.module.css";
import { Suspense } from "react";

const Home = ({ search, filters }) => {
  const [page, setPage] = useState(1);
  const debounceSearch = useDebounce(search, 1000);

  const { character, loading, hasMore } = useCharacterData(
    filters,
    debounceSearch,
    page
  );
  // Function to load next page when "Load More" is clicked
  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1); // Reset page if search/filters change
  }, [filters, debounceSearch]);

  return (
    <div className={containerStyles.container}>
      {/* Main character grid display */}
      <ErrorBoundary fallback={<div>Failed to load characters.</div>}>
        <Suspense fallback={<div>Loading Characters...</div>}>
          <div className={gridStyles.grid}>
            {loading && page === 1 ? (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  gridColumn: "1 / -1", // This makes the loading span all columns in the grid
                }}
              >
                Loading...
              </div>
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
      {hasMore && !loading && character.length > 0 && page > 0 &&(
        <button
          onClick={loadMore}
          className={buttonStyles.button}
          style={{ marginTop: "10px" }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
