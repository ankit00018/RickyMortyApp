// src/components/CharacterCard.test.jsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from '../CharacterCard';

describe('CharacterCard Component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );
  };

  it('renders character information correctly', () => {
    renderComponent();
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('has correct navigation link', () => {
    renderComponent();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/character/1');
  });

  it('maintains image aspect ratio', () => {
    renderComponent();
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toHaveStyle('width: 100%');
    expect(image).toHaveStyle('aspect-ratio: 1/1');
    expect(image).toHaveStyle('object-fit: cover');
  });

  it('applies card styling classes', () => {
    const { container } = renderComponent();
    const cardDiv = container.querySelector('div[class*="card"]');
    expect(cardDiv).toBeInTheDocument();
  });
});
