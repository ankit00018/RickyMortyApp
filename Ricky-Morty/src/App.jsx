import React, { Suspense } from "react";
import "./App.css";

// This improves performance by loading each page component only when the route is visited.
const CharacterProfile = React.lazy(() => import("./pages/CharacterProfile"));
const Home = React.lazy(() => import("./pages/Home"));
const Locations = React.lazy(() => import("./pages/Locations"));
const Episodes = React.lazy(() => import("./pages/Episodes"));
import ErrorBoundary from "./utils/ErrorBoundary"

import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary
        fallback={
          <div style={{ padding: "2rem", color: "red" }}>
            Oops, something went wrong while loading the page.
          </div>
        }
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<CharacterProfile />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/episodes" element={<Episodes />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
