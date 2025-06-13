import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

// Fetch character by ID
export const fetchCharacterById = async (id) => {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data;
};

// Fetch multiple episodes by an array of IDs
export const fetchEpisodesByIds = async (ids) => {
  const response = await axios.get(`${BASE_URL}/episode/${ids.join(",")}`);
  return Array.isArray(response.data) ? response.data : [response.data];
};

// Fetch episodes by name (search input)
export const fetchEpisodesByName = async (search) => {
  const response = await axios.get(`${BASE_URL}/episode/?name=${search}`);
  return response.data.results;
};

// Fetch locations by name (search input)
export const fetchLocationsByName = async (search) => {
  const response = await axios.get(`${BASE_URL}/location/?name=${search}`);
  return response.data.results;
};

// Fetch characters using filters, search term, and page (pagination)
export const fetchCharacters = async (filters, search, page) => {
  const params = new URLSearchParams({
    page,
    name: search,
    status: filters.status,
    gender: filters.gender,
    species: filters.species,
    type: filters.type,
  });

  // Optional filters: location and episode
  if (filters.location) params.append("location", filters.location);
  if (filters.episode) params.append("episode", filters.episode);

  const response = await axios.get(`${BASE_URL}/character/?${params.toString()}`);
  return response.data;
};
