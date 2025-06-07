import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import useEpisodes from '../hooks/useEpisode';

vi.mock('axios');

describe('useEpisodes hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches episodes successfully and updates state', async () => {
    const mockEpisodes = [{ id: 1, name: 'Pilot' }, { id: 2, name: 'Lawnmower Dog' }];
    axios.get.mockResolvedValueOnce({ data: { results: mockEpisodes } });

    const { result } = renderHook(() => useEpisodes('pilot'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual(mockEpisodes);
      expect(result.current.error).toBe('');
    });
  });

  it('handles API error and sets error state', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useEpisodes('unknown'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual([]);
      expect(result.current.error).toBe('No episode data found');
    });
  });
});
