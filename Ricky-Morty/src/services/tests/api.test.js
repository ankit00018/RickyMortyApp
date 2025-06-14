// src/services/api.test.js
import axios from 'axios';
import {
  fetchCharacterById,
  fetchEpisodesByIds,
  fetchEpisodesByName,
  fetchLocationsByName,
  fetchCharacters
} from '../api';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock axios
vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe('fetchCharacterById', () => {
    it('should fetch character by ID', async () => {
      const mockCharacter = { id: 1, name: 'Rick Sanchez' };
      axios.get.mockResolvedValue({ data: mockCharacter });

      const result = await fetchCharacterById(1);
      
      expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      expect(result).toEqual(mockCharacter);
    });

    it('should handle errors', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));
      
      await expect(fetchCharacterById(1)).rejects.toThrow('Network Error');
    });
  });

  describe('fetchEpisodesByIds', () => {
    it('should fetch multiple episodes with array of IDs', async () => {
      const mockEpisodes = [{ id: 1 }, { id: 2 }];
      axios.get.mockResolvedValue({ data: mockEpisodes });

      const result = await fetchEpisodesByIds([1, 2]);
      
      expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1,2');
      expect(result).toEqual(mockEpisodes);
    });

    it('should return single episode as array when single ID provided', async () => {
      const mockEpisode = { id: 1 };
      axios.get.mockResolvedValue({ data: mockEpisode });

      const result = await fetchEpisodesByIds([1]);
      
      expect(result).toEqual([mockEpisode]);
    });

    it('should handle errors', async () => {
      axios.get.mockRejectedValue(new Error('Not Found'));
      
      await expect(fetchEpisodesByIds([1])).rejects.toThrow('Not Found');
    });
  });

  describe('fetchEpisodesByName', () => {
    it('should fetch episodes by name', async () => {
      const mockEpisodes = [{ id: 1, name: 'Pilot' }];
      axios.get.mockResolvedValue({ data: { results: mockEpisodes } });

      const result = await fetchEpisodesByName('Pilot');
      
      expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/?name=Pilot');
      expect(result).toEqual(mockEpisodes);
    });

    it('should handle empty results', async () => {
      axios.get.mockResolvedValue({ data: { results: [] } });
      
      const result = await fetchEpisodesByName('Unknown');
      expect(result).toEqual([]);
    });
  });

  describe('fetchLocationsByName', () => {
    it('should fetch locations by name', async () => {
      const mockLocations = [{ id: 1, name: 'Earth' }];
      axios.get.mockResolvedValue({ data: { results: mockLocations } });

      const result = await fetchLocationsByName('Earth');
      
      expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/location/?name=Earth');
      expect(result).toEqual(mockLocations);
    });
  });

  describe('fetchCharacters', () => {
    it('should fetch characters with filters and pagination', async () => {
      const mockResponse = {
        info: { count: 1 },
        results: [{ id: 1, name: 'Rick' }]
      };
      const filters = {
        status: 'alive',
        gender: 'male',
        species: 'human',
        type: '',
        location: 'Earth',
        episode: '1'
      };
      
      axios.get.mockResolvedValue({ data: mockResponse });

      const result = await fetchCharacters(filters, 'Rick', 1);
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/?page=1&name=Rick&status=alive&gender=male&species=human&type=&location=Earth&episode=1'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should omit empty optional filters', async () => {
      const mockResponse = { info: {}, results: [] };
      const filters = {
        status: '',
        gender: '',
        species: '',
        type: '',
        location: '',
        episode: ''
      };
      
      axios.get.mockResolvedValue({ data: mockResponse });

      await fetchCharacters(filters, '', 1);
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/?page=1&name=&status=&gender=&species=&type='
      );
    });
  });
});