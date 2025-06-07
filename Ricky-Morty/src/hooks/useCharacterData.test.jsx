import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import useCharacterData from './useCharacterData';
import axios from 'axios';
import { vi } from 'vitest';

// Step 1: Mock axios
vi.mock('axios');

// Step 2: Dummy Component to consume the hook
const TestComponent = ({ filters, search, page }) => {
  const { character, loading, hasMore } = useCharacterData(filters, search, page);

  if (loading) return <p>Loading...</p>;
  if (!character.length) return <p>No characters</p>;

  return (
    <div>
      <p>{hasMore ? 'More characters available' : 'End of list'}</p>
      {character.map((char) => (
        <p key={char.id}>{char.name}</p>
      ))}
    </div>
  );
};

describe('useCharacterData Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it('fetches and renders characters on success', async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { id: 1, name: 'Rick Sanchez' },
          { id: 2, name: 'Morty Smith' }
        ],
        info: { next: 'some-url' }
      }
    });

    const filters = { status: '', gender: '', species: '', type: '' };
    const search = '';
    const page = 1;

    render(<TestComponent filters={filters} search={search} page={page} />);

    // Wait for characters to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('handles API error and shows no characters', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const filters = { status: '', gender: '', species: '', type: '' };
    const search = '';
    const page = 1;

    render(<TestComponent filters={filters} search={search} page={page} />);

    // Wait for fallback "No characters"
    await waitFor(() => {
      expect(screen.getByText('No characters')).toBeInTheDocument();
    });
  });
});
