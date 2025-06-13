import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as api from '../../services/api'; // Make sure this path is correct
import useLocations from '../useLocations';

vi.mock('../services/api'); // Mock the entire API service

describe('useLocations', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Reset mocks between tests
  });

  it('should fetch and return location data on success', async () => {
    // Mock the resolved API data
    api.fetchLocationsByName.mockResolvedValue([
      { id: 1, name: 'Earth (C-137)' },
      { id: 2, name: 'Gazorpazorp' },
    ]);

    const { result } = renderHook(() => useLocations('earth'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData).toHaveLength(2);
    expect(result.current.locationData[0].name).toBe('Earth (C-137)');
    expect(result.current.error).toBe('');
  });

  it('should handle fetch error and set error message', async () => {
    api.fetchLocationsByName.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useLocations('unknown-place'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData).toEqual([]);
    expect(result.current.error).toBe('No location found.');
  });
});
