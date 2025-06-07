// LocationCard is a reusable UI component that displays basic information about a given location object.
// It shows the location's name, type, and dimension inside a styled box.

const LocationCard = ({ location }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        margin: "0.5rem",
        backgroundColor: "#f4f8ff",
      }}
    >
      {/* Location name as the card title */}
      <h3>{location.name}</h3>

      {/* Type of location (e.g., Planet, Space station, etc.) */}
      <p>
        <strong>Type:</strong> {location.type}
      </p>

      {/* Dimension the location belongs to (important for profile views) */}
      <p>
        <strong>Dimension:</strong> {location.dimension}
      </p>
    </div>
  );
};

export default LocationCard;
