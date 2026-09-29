import { useState } from "react";
import logoIcon from "../assets/icon.png";
import "./components.css";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="header-logo">
          <img src={logoIcon} alt="Codec Logo" className="header-logo-icon" />
          <span className="header-logo-text">CODEC</span>
        </a>

        <button
          className="header-menu-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="header-menu-icon"></span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? "header-nav-open" : ""}`}>
          <ul className="header-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="header-nav-item">
                <a
                  href={link.href}
                  className="header-nav-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="https://github.com/mkj777/codec" target="_blank" rel="noreferrer" className="header-nav-link">
            GitHub
          </a>
          <a href="#download" className="header-download-link" onClick={closeMenu}>
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
