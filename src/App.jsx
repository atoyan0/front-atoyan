import './App.css';
import './responsive.css';
import { useEffect, useState } from 'react';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import Header from './layout/Header';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredPosts = posts.filter(p => 
    [p.title, p.text].some(val => val?.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    fetch('https://cloud.codesupply.co/endpoint/react/data.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="App">
     {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      <Header onSearch={setSearch} selectedPost={selectedPost}
       isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
      />

      <main className={`content ${isMenuOpen ? 'body-locked' : ''}`}>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <PostList posts={filteredPosts} onSelect={setSelectedPost} />
        )}
      </main>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default App;