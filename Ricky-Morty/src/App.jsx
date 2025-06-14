// App.jsx
import React, { useState, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ErrorBoundary from "./utils/ErrorBoundary";

const CharacterProfile = React.lazy(() => import("./pages/CharacterProfile"));
const Home = React.lazy(() => import("./pages/Home"));
const Locations = React.lazy(() => import("./pages/Locations"));
const Episodes = React.lazy(() => import("./pages/Episodes"));

const App = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    gender: "",
    location: "",
    episode: "",
    species: "",
    type: "",
  });

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Always visible: only show on home page */}
      {isHome && (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem" }}>
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>
      )}

      {/* Main Routes */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem" }}>
        <ErrorBoundary
          fallback={
            <div style={{ padding: "2rem", color: "red" }}>
              Oops, something went wrong while loading the page.
            </div>
          }
        >
          <Suspense fallback={<div style={{ minHeight: '400px' }}>Loading page...</div>}>
            <Routes>
              <Route
                path="/"
                element={<Home search={search} filters={filters} />}
              />
              <Route path="/character/:id" element={<CharacterProfile />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/episodes" element={<Episodes />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;
