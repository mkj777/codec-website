import { useState } from 'react';
import type { NavLink } from '../../types';
import styles from './Header.module.css';
import logoIcon from '../../assets/icon.png';

const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download' },
  { label: 'About', href: '#about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src={logoIcon} alt="Codec Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Codec</span>
        </a>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.menuIcon}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#download" className={styles.ctaButton}>
            Get Codec
          </a>
        </nav>
      </div>
    </header>
  );
}
