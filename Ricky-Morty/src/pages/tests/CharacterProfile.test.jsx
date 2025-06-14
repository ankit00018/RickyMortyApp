import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import CharacterProfile from '../CharacterProfile';
import useCharacterProfile from '../../hooks/useCharacterProfile';

// Mock the dependencies
vi.mock('react-router-dom');
vi.mock('../../hooks/useCharacterProfile');

describe('CharacterProfile Component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    type: 'Genius',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' }
  };

  const mockEpisodes = [
    { id: 1, name: 'Pilot', air_date: 'December 2, 2013' },
    { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013' }
  ];

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useCharacterProfile).mockReturnValue({
      character: null,
      episodes: [],
      loading: true
    });
  });

  it('should render loading state initially', () => {
    render(<CharacterProfile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display character details when loaded', () => {
    vi.mocked(useCharacterProfile).mockReturnValue({
      character: mockCharacter,
      episodes: mockEpisodes,
      loading: false
    });

    render(<CharacterProfile />);

    // Check heading and image
    expect(screen.getByRole('heading', { name: /rick sanchez/i })).toBeInTheDocument();
    expect(screen.getByAltText(/rick sanchez/i)).toHaveAttribute('src', mockCharacter.image);
    
    // Check status
    expect(screen.getByText(/status:/i).parentElement).toHaveTextContent('Status: Alive');
    
    // Check species
    expect(screen.getByText(/species:/i).parentElement).toHaveTextContent('Species: Human');
    
    // Check gender
    expect(screen.getByText(/gender:/i).parentElement).toHaveTextContent('Gender: Male');
    
    // Check type
    expect(screen.getByText(/type:/i).parentElement).toHaveTextContent('Type: Genius');
    
    // Check origin section
    const originSection = screen.getByRole('heading', { name: /origin/i }).closest('div');
    expect(originSection).toHaveTextContent('Origin');
    expect(originSection).toHaveTextContent('Name: Earth (C-137)');
    
    // Check location section
    const locationSection = screen.getByRole('heading', { name: /location/i }).closest('div');
    expect(locationSection).toHaveTextContent('Location');
    expect(locationSection).toHaveTextContent('Name: Citadel of Ricks');
  });

  it('should not display type if not available', () => {
    const characterWithoutType = { ...mockCharacter, type: '' };
    vi.mocked(useCharacterProfile).mockReturnValue({
      character: characterWithoutType,
      episodes: mockEpisodes,
      loading: false
    });

    render(<CharacterProfile />);
    expect(screen.queryByText(/type:/i)).not.toBeInTheDocument();
  });

  it('should display episodes list correctly', () => {
    vi.mocked(useCharacterProfile).mockReturnValue({
      character: mockCharacter,
      episodes: mockEpisodes,
      loading: false
    });

    render(<CharacterProfile />);
    const episodeItems = screen.getAllByRole('listitem');
    expect(episodeItems).toHaveLength(2);
    expect(episodeItems[0]).toHaveTextContent('Pilot (Air date: December 2, 2013)');
    expect(episodeItems[1]).toHaveTextContent('Lawnmower Dog (Air date: December 9, 2013)');
  });

  it('should apply correct styles to character image', () => {
    vi.mocked(useCharacterProfile).mockReturnValue({
      character: mockCharacter,
      episodes: mockEpisodes,
      loading: false
    });

    render(<CharacterProfile />);
    const image = screen.getByAltText(/rick sanchez/i);
    expect(image).toHaveStyle({
      display: 'block',
      margin: '0 auto'
    });
  });
});