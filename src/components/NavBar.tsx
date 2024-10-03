import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import github from '../assets/images/github.png';
import sunIcon from '../assets/images/sun-icon.png'; 
import moonIcon from '../assets/images/moon-icon.png'; 
import { Menu, X, BadgeInfo } from 'lucide-react';

export function NavBar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="logo-container">
            <img 
              className="logo" 
              src={logo} 
              alt="Logo" 
            />
            <span className="brand-name">TuneTagger</span>
          </div>
          <div className={`nav-links ${mobileDrawerOpen ? 'active' : ''}`}>
            <a 
              href="https://github.com/TheGhossst" 
              target="_blank" 
              className="nav-icon-link"
              rel="noopener noreferrer"
            >
              <img 
                src={github} 
                alt="GitHub Icon" 
                className="github-icon" 
              />
            </a>
            <BadgeInfo className="badge-info-icon" />
            
            <div className="theme-toggle">
              <img 
                src={sunIcon} 
                alt="Light Mode" 
                className={`theme-icon sun-icon ${darkMode ? 'inactive' : ''}`} 
              />
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="theme-switch" 
                  checked={darkMode} 
                  onChange={toggleTheme} 
                />
                <span className="slider"></span>
              </label>
              <img 
                src={moonIcon} 
                alt="Dark Mode" 
                className={`theme-icon moon-icon ${darkMode ? '' : 'inactive'}`} 
              />
            </div>
          </div>

          <div className="mobile-menu">
            <button 
              onClick={toggleNavbar} 
              aria-expanded={mobileDrawerOpen} 
              aria-label="Toggle navigation"
            >
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
