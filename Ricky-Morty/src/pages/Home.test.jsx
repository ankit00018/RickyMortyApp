import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';

// Mock default export from useCharacterData
vi.mock('../hooks/useCharacterData', () => {
  return {
    default: () => ({
      loading: false,
      character: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      hasMore: true,
      loadMore: vi.fn(),
    }),
  };
});

describe('Home component', () => {
  test('renders character names and Load More button', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });
});
