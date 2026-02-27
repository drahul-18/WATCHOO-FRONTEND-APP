import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import { useTmdbData } from './hooks/useTmdbData';
import './App.css';

function App() {
  const { featured, newThisWeek, trendingNow, loading, error } = useTmdbData();

  if (error) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content" style={{ padding: '48px', color: '#E50914' }}>
          <h2>Error loading data</h2>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {loading ? (
          <div style={{ padding: '48px', color: '#FFFFFF' }}>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <Hero featured={featured} />
            <Carousel title="New this week" items={newThisWeek} />
            <Carousel title="Trending Now" items={trendingNow} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
