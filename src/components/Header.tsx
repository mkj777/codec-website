import { useState } from "react";
import logoIcon from "../assets/icon.png";
import "./components.css";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="header-logo">
          <img src={logoIcon} alt="Codec Logo" className="header-logo-icon" />
          <span className="header-logo-text">Codec</span>
        </a>

        <button
          className="header-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#download" className="header-cta-button">
            Get Codec
          </a>
        </nav>
      </div>
    </header>
  );
}
