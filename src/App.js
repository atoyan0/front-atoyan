import './App.css';
import './responsive.css';
import { useEffect, useRef, useState } from 'react';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import { IoMdSearch } from "react-icons/io";
import { HiChevronDown } from 'react-icons/hi';
import { HiChevronRight } from "react-icons/hi2";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseLeave = () => {
    setShowSearch(false);
  };
    
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://cloud.codesupply.co/endpoint/react/data.json');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(search.toLowerCase()) ||
    post.text?.toLowerCase().includes(search.toLowerCase())
  );

  const menuItems = [
    { id: 1, title: 'Demos',      hasDropdown: true, subMenu: ['Demo 1', 'Demo 2', 'Demo 3', 'Demo 4', 'Demo 5'] },
    { id: 2, title: 'Post',       hasDropdown: true, subMenu: ['Post Header', 'Post Layout', 'Share Buttons', 'Gallery Post', 'Video Post'] },
    { id: 3, title: 'Features',   hasDropdown: true, subMenu: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 4, title: 'Categories', hasDropdown: true, subMenu: ['Cat 1', 'Cat 2', 'Cat 3'] },
    { id: 5, title: 'Shop',       hasDropdown: true, subMenu: ['Shop 1', 'Shop 2', 'Shop 3', 'Shop 4'] },
    { id: 6, title: 'Buy Now',    hasDropdown: false },
  ];

  return (
    <div className="App">
      <header className="main-header">
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
        <div className="logo">
          {!menuOpen && (
            <button className="burger" onClick={() => setMenuOpen(true)}>☰</button>
          )}
          <h1>LOGOTYPE</h1>
          <div className="search-container" onMouseLeave={handleMouseLeave} ref={containerRef}>
            {showSearch && (
              <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
            )}
            <IoMdSearch className="search-icon" onClick={() => setShowSearch(!showSearch)} />
          </div>
        </div>
  
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
              <div className='logo two'>
                <h1>LOGOTYPE</h1>
              </div>
              <button className="close-menu" onClick={() => setMenuOpen(false)}>✕</button>
            {menuItems.map(item => (
              <li key={item.id} className="nav-item">
                <div className="nav-link">
                  {item.title} {item.hasDropdown && <HiChevronDown className="arrow" />}
                </div>
                {item.subMenu && (
                  <ul className="dropdown-menu">
                    {item.subMenu.map((sub, i) => (
                      <li key={i} className="dropdown-item">
                        <span className="dropdown-text">{sub}</span>
                        <HiChevronRight className="sub-arrow" />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
  
      <main className="content">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <PostList posts={filteredPosts} onSelect={setSelectedPost} />
        )}
      </main>
        {
        selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
    </div>
  );
}

export default App;