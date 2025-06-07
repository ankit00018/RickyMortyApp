import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import useLocations from './useLocations';

vi.mock('axios');

describe('useLocations hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches location data successfully', async () => {
    const mockLocations = [{ id: 1, name: 'Earth' }, { id: 2, name: 'Mars' }];
    axios.get.mockResolvedValueOnce({ data: { results: mockLocations } });

    const { result } = renderHook(() => useLocations('earth'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.locationData).toEqual(mockLocations);
      expect(result.current.error).toBe('');
    });
  });

  it('handles API failure and sets error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useLocations('unknown'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.locationData).toEqual([]);
      expect(result.current.error).toBe('No location found.');
    });
  });
});
