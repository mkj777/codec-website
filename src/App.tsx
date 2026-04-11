import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { Showcase } from "./components/Showcase";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";
import { fetchLatestDownloadUrl, GITHUB_RELEASES_URL } from "./lib/github";

function App() {
  const [downloadUrl, setDownloadUrl] = useState(GITHUB_RELEASES_URL);
  const path = window.location.pathname;
  const isNotFound = path !== "/" && path !== "/index.html";

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-children",
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isActive = true;

    const syncLatestDownloadUrl = async () => {
      try {
        const latestDownloadUrl = await fetchLatestDownloadUrl();

        if (isActive) {
          setDownloadUrl(latestDownloadUrl);
        }
      } catch (error) {
        console.error("Failed to resolve latest Codec download URL.", error);
      }
    };

    void syncLatestDownloadUrl();

    return () => {
      isActive = false;
    };
  }, []);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="app">
      <main>
        <Hero downloadUrl={downloadUrl} />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
