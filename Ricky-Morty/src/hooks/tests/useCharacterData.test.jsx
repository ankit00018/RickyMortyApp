import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import useCharacterData from '../useCharacterData';

vi.mock('axios');

describe('useCharacterData', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockFilters = {
    status: '',
    gender: '',
    species: '',
    type: '',
    location: '',
    episode: '',
  };

  it('fetches character data successfully on first page', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Rick Sanchez' },
          { id: 2, name: 'Morty Smith' },
        ],
        info: { next: 'next-page-url' },
      },
    });

    const { result } = renderHook(() =>
      useCharacterData(mockFilters, '', 1)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toHaveLength(2);
    expect(result.current.hasMore).toBe(true);
  });

  it('appends data for next page (infinite scroll)', async () => {
    // First page
    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ id: 1, name: 'Rick Sanchez' }],
        info: { next: 'page-2-url' },
      },
    });

    const { result, rerender } = renderHook(
      ({ filters, search, page }) =>
        useCharacterData(filters, search, page),
      {
        initialProps: { filters: mockFilters, search: '', page: 1 },
      }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.character).toHaveLength(1);

    // Second page
    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ id: 2, name: 'Morty Smith' }],
        info: { next: null },
      },
    });

    rerender({ filters: mockFilters, search: '', page: 2 });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.character).toHaveLength(2); // Appended
    expect(result.current.hasMore).toBe(false);
  });

  it('handles error and sets character list empty', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() =>
      useCharacterData(mockFilters, '', 1)
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toEqual([]);
    expect(result.current.hasMore).toBe(false);
  });
});
