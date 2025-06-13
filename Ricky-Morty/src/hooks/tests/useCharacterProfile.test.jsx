import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as api from '../../services/api'; // <-- Adjust this path if needed
import useCharacterProfile from '../useCharacterProfile';

vi.mock('../services/api'); // 👈 Mock your API service

describe('useCharacterProfile', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches character and episodes data', async () => {
    // Mock the API functions
    api.fetchCharacterById.mockResolvedValue({
      id: 1,
      name: 'Rick Sanchez',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
    });

    api.fetchEpisodesByIds.mockResolvedValue([
      { id: 1, name: 'Pilot' },
      { id: 2, name: 'Lawnmower Dog' },
    ]);

    const { result } = renderHook(() => useCharacterProfile(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toMatchObject({ id: 1, name: 'Rick Sanchez' });
    expect(result.current.episodes.length).toBe(2);
    expect(result.current.episodes[0]).toMatchObject({ id: 1, name: 'Pilot' });
  });

  it('handles fetch error gracefully', async () => {
    api.fetchCharacterById.mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useCharacterProfile(9999));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toBe(null);
    expect(result.current.episodes).toEqual([]);
  });
});
