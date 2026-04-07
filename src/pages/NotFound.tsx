import { useEffect } from 'react';
import mascotImage from '../assets/shrimpSleep.png';
import './NotFound.css';

export function NotFound() {
  useEffect(() => {
    // Add visible class after mount for animation
    const timer = setTimeout(() => {
      const content = document.querySelector('.not-found-content');
      if (content) content.classList.add('visible');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-description">
            Looks like this page went into hiding. Let's get you back home.
          </p>
          <div className="not-found-actions">
            <a href="/" className="not-found-primary-button">
              Go back home
            </a>
            <a href="/#features" className="not-found-secondary-button">
              Explore features
            </a>
          </div>
        </div>
        <div className="not-found-image-wrapper">
          <img
            src={mascotImage}
            alt="Codec Mascot Resting"
            className="not-found-mascot"
          />
          <div className="not-found-glow"></div>
        </div>
      </div>
    </div>
  );
}
