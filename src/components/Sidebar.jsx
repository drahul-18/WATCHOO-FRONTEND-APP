import { Search, Home, Film, Tv, ChevronUp, Plus, Shuffle } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <a href="#" className="nav-item" title="Search">
          <Search size={24} />
        </a>
        <a href="#" className="nav-item active" title="Home">
          <Home size={24} />
        </a>
        <a href="#" className="nav-item" title="Movies">
          <Film size={24} />
        </a>
        <a href="#" className="nav-item" title="TV Shows">
          <Tv size={24} />
        </a>
        <a href="#" className="nav-item" title="My List">
          <ChevronUp size={24} />
        </a>
        <a href="#" className="nav-item" title="Add">
          <Plus size={24} />
        </a>
        <a href="#" className="nav-item" title="Play Something">
          <Shuffle size={24} />
        </a>
      </nav>
    </aside>
  );
}
