// Navbar is the top navigation bar of the app.
// It provides quick access to main routes: Home, Locations, and Episodes.
// Using <Link> from react-router-dom ensures client-side routing.

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#20232a", color: "#fff" }} className="navbar">
      {/* Navigation Links */}

      <Link to="/" style={{ margin: "0 1rem", color: "#61dafb" }}>
        Home
      </Link>

      <Link to="/locations" style={{ margin: "0 1rem", color: "#61dafb" }}>
        Locations
      </Link>

      <Link to="/episodes" style={{ margin: "0 1rem", color: "#61dafb" }}>
        Episodes
      </Link>
    </nav>
  );
};

export default Navbar;
