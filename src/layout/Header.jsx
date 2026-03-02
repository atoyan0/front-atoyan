import './Header.css';
import { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { IoMdSearch } from "react-icons/io";

export default function Header({ onSearch, selectedPost }) {
    const [posts, setPosts] = useState([]);
    const [ui, setUi] = useState({ 
            showSearch: false, 
            isHidden: false, 
            menuOpen: false, 
            openMenuId: null,
    });    
    const [loading, setLoading] = useState(true);

    const menuitem = [
      { id: 1, title: 'Demos',      subMenu: ['Demo 1', 'Demo 2', 'Demo 3'] },
      { id: 2, title: 'Post',       subMenu: ['Post Header', 'Post Layout', 'Share Buttons', 'Post Video'] },
      { id: 3, title: 'Features',   subMenu: ['Feature 1', 'Feature 2'] },
      { id: 4, title: 'Categories', subMenu: ['Cat 1', 'Cat 2'] },
      { id: 5, title: 'Shop',       subMenu: ['Shop 1', 'Shop 2'] },
      { id: 6, title: 'Buy Now' },
    ];
    
    useEffect(() => {
      fetch('https://cloud.codesupply.co/endpoint/react/data.json')
        .then(res => res.json())
        .then(data => { 
            setPosts(data); 
            setLoading(false); 
        })
        .catch(() => setLoading(false));
    }, []);
  
    useEffect(() => {
      let lastY = 0;
      const handleScroll = () => {
        setUi(prev => ({ ...prev, isHidden: window.scrollY > lastY && window.scrollY > 200 }));
        lastY = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll);
      
      document.body.style.overflow = (ui.menuOpen || selectedPost) ? 'hidden' : 'auto';
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, [ui.menuOpen, selectedPost]);

    const toggleUi = (key, val) => setUi(prev => ({ ...prev, [key]: val }));
   
    return (
      <div className='header'>
        {ui.menuOpen && (
          <div className="overlay" onClick={() => toggleUi('menuOpen', false)}></div>
        )}

        <header className={`main-header ${ui.isHidden ? 'hidden' : ''} ${selectedPost ? 'behind' : ''}`}>
          <div className="logo">
            {!ui.menuOpen && (
              <>
                <button className="burger" onClick={() => toggleUi('menuOpen', true)}>☰</button>
                <h1>LOGOTYPE</h1>
              </>
            )}

            <div className="search-container" onMouseLeave={() => toggleUi('showSearch', false)}>
              {ui.showSearch && (
                <input 
                    className="search-input" 
                    placeholder='Search ...' 
                    autoFocus 
                    onChange={e => onSearch(e.target.value)} 
                />
              )}
              <IoMdSearch className="search-icon" onClick={() => toggleUi('showSearch', !ui.showSearch)} />
            </div>
          </div>

          <nav className={`nav-menu ${ui.menuOpen ? 'open' : ''}`}>
            {ui.menuOpen && (
              <div className="menu-header">
                <h1 className='twoh1'>LOGOTYPE</h1>
                <button className="close-menu" onClick={() => toggleUi('menuOpen', false)}>✕</button>
              </div>
            )}

            <ul className="nav-list">
              {menuitem.map(item => (
                <li key={item.id} 
                    className="nav-item"
                    onMouseEnter={() => window.innerWidth > 1024 && toggleUi('openMenuId', item.id)}
                    onMouseLeave={() => window.innerWidth > 1024 && toggleUi('openMenuId', null)}
                    onClick={(e) => {
                      if (item.subMenu) {
                        e.stopPropagation();
                        const nextId = ui.openMenuId === item.id ? null : item.id;
                        toggleUi('openMenuId', nextId);
                      }
                    }}
                >
                  <div className="nav-link">
                    {item.title} 
                    {item.subMenu && (
                      <HiChevronRight className={`arrow ${ui.openMenuId === item.id ? 'rotate' : ''}`} />
                    )}
                  </div>

                  {item.subMenu && ui.openMenuId === item.id && (
                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}> 
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
      </div>
    );
}