import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EpisodeCard from '../EpisodeCard';

describe('EpisodeCard Component', () => {
  const mockEpisode = {
    id: 1,
    name: 'Pilot',
    episode: 'S01E01',
    air_date: 'December 2, 2013'
  };

  it('renders episode information correctly', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    // Check episode name
    expect(screen.getByText('Pilot')).toBeInTheDocument();
    
    // Check episode code - now checks the parent paragraph element
    const episodeParagraph = screen.getByText(/Episode:/).closest('p');
    expect(episodeParagraph).toHaveTextContent('Episode: S01E01');
    
    // Check air date - same approach
    const airDateParagraph = screen.getByText(/Air Date:/).closest('p');
    expect(airDateParagraph).toHaveTextContent('Air Date: December 2, 2013');
  });

  it('applies correct styling', () => {
    const { container } = render(<EpisodeCard episode={mockEpisode} />);
    const card = container.firstChild;

    expect(card).toHaveStyle('border: 1px solid #ccc');
    expect(card).toHaveStyle('border-radius: 10px');
    expect(card).toHaveStyle('padding: 1rem');
    expect(card).toHaveStyle('margin: 0.5rem');
    expect(card).toHaveStyle('background-color: #f9f9f9');
  });

  it('renders all required fields', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getAllByText(/Episode:|Air Date:/).length).toBe(2);
  });

  it('handles missing data gracefully', () => {
    const incompleteEpisode = {
      id: 2,
      name: 'Unknown Episode'
    };
    
    render(<EpisodeCard episode={incompleteEpisode} />);
    
    expect(screen.getByText('Unknown Episode')).toBeInTheDocument();
    expect(screen.getByText(/Episode:/)).toBeInTheDocument();
    expect(screen.getByText(/Air Date:/)).toBeInTheDocument();
  });
});