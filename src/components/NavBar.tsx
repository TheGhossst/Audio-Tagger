import { useState } from 'react';
import logo from '../assets/images/logo.png';
import github from '../assets/images/github.png';
import { Menu, X, BadgeInfo } from 'lucide-react';

export function NavBar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
            <button
              /*onClick={() => alert("Click")}*/
              onClick={() => {
                if (window.confirm("You are about to leave this site and visit an external website. Do you want to proceed?")) {
                  window.open('https://en.wikipedia.org/wiki/Tag_editor', '_blank');
                }
              }}
              className="info-btn"
              aria-label="Show information"
            >
              <BadgeInfo className="badge-info-icon" />
            </button>
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
