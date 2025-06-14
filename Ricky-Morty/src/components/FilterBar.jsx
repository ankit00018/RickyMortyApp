import inputStyles from "../styles/input.module.css";
import styles from "../styles/filterbar.module.css";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.filterbar}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <select
        id="status"
        name="status"
        value={filters.status}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-status"
      >
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        id="gender"
        name="gender"
        value={filters.gender}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-gender"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        id="location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-location"
      >
        <option value="">All Locations</option>
        <option value="earth">Earth</option>
        <option value="citadel">Citadel of Ricks</option>
        <option value="abadango">Abadango</option>
      </select>

      <select
        id="episode"
        name="episode"
        value={filters.episode}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-episode"
      >
        <option value="">All Episodes</option>
        <option value="pilot">Pilot</option>
        <option value="lawnmower">Lawnmower Dog</option>
        <option value="anatomy">Anatomy Park</option>
      </select>

      <select
        id="species"
        name="species"
        value={filters.species}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-species"
      >
        <option value="">All Species</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="robot">Robot</option>
        <option value="animal">Animal</option>
        <option value="mytholog">Mythological</option>
      </select>

      <select
        id="type"
        name="type"
        value={filters.type}
        onChange={handleChange}
        className={inputStyles.input}
        data-testid="filter-type"
      >
        <option value="">All Types</option>
        <option value="parasite">Parasite</option>
        <option value="genetic experiment">Genetic Experiment</option>
        <option value="superhuman">Superhuman</option>
        <option value="human with antennae">Human with Antennae</option>
      </select>
    </div>
  );
};

export default FilterBar;
