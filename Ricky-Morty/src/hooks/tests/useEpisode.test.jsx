import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as api from '../../services/api'; // Adjust path as needed
import useLocations from '../useLocations';

vi.mock('../services/api'); // Mocking the API module

describe('useLocations', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and returns location data successfully', async () => {
    // Mock resolved value
    api.fetchLocationsByName.mockResolvedValue([
      { id: 1, name: 'Earth (C-137)' },
      { id: 2, name: 'Abadango' },
    ]);

    const { result } = renderHook(() => useLocations('earth'));

    expect(result.current.loading).toBe(true); // initial state

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData.length).toBe(2);
    expect(result.current.locationData[0]).toMatchObject({ name: 'Earth (C-137)' });
    expect(result.current.error).toBe('');
  });

  it('handles API error gracefully', async () => {
    // Simulate failed API call
    api.fetchLocationsByName.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useLocations('wrong-location'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData).toEqual([]);
    expect(result.current.error).toBe('No location found.');
  });
});
