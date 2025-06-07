// Simple reusable card component for displaying a single episode's details

const EpisodeCard = ({ episode }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      margin: "0.5rem",
      backgroundColor: "#f9f9f9",
    }}>

      {/* Episode title */}
      <h3>{episode.name}</h3>

      {/* Episode code, e.g., S01E01 */}
      <p><strong>Episode:</strong> {episode.episode}</p>

        {/* Original air date of the episode */}
      <p><strong>Air Date:</strong> {episode.air_date}</p>
    </div>
  );
};

export default EpisodeCard;
