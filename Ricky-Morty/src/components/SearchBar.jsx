// This component renders the search bar used to filter characters by name.
// Props:
// value: current input value
// onChange: function to handle input changes

import inputStyles from "../styles/input.module.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div style={{ padding: "1rem", textAlign: "center" }} className="searchbar">

      {/* Search input field — styled for clean look and responsiveness */}
      <input
        type="text"
        name="search"
        placeholder="Search character by name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputStyles.input}
        style={{
          padding: "0.5rem",
          width: "60%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default SearchBar;
