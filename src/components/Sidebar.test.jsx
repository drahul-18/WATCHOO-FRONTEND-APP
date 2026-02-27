import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders navigation icons', () => {
    render(<Sidebar />);
    expect(screen.getByTitle('Search')).toBeInTheDocument();
    expect(screen.getByTitle('Home')).toBeInTheDocument();
    expect(screen.getByTitle('Movies')).toBeInTheDocument();
    expect(screen.getByTitle('TV Shows')).toBeInTheDocument();
    expect(screen.getByTitle('My List')).toBeInTheDocument();
    expect(screen.getByTitle('Add')).toBeInTheDocument();
    expect(screen.getByTitle('Play Something')).toBeInTheDocument();
  });

  it('has active class on Home link', () => {
    render(<Sidebar />);
    const homeLink = screen.getByTitle('Home').closest('a');
    expect(homeLink).toHaveClass('active');
  });
});
