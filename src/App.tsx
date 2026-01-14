import { useEffect } from 'react';
import { Hero, Features, Showcase, Download, Footer } from './components';
import './App.css';

function App() {
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
  }, []);

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
