import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Features } from './components/Features';
import { Download } from './components/Download';
import { Footer } from './components/Footer';
import { NotFound } from './NotFound';
import './App.css';

function App() {
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Simple client-side routing check
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      setIsNotFound(true);
    }
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll, .animate-children');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isNotFound]);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="app">
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Download />
      </main>
      <Footer />
    </div>
  );
}

export default App;
