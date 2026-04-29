import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { NotFound } from "./pages/NotFound";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { fetchLatestDownloadUrl, WINDOWS_INSTALLER_DOWNLOAD_URL } from "./lib/github";

function App() {
  const [downloadUrl, setDownloadUrl] = useState(WINDOWS_INSTALLER_DOWNLOAD_URL);
  const path = window.location.pathname;
  const isNotFound = path !== "/" && path !== "/index.html";

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
      <AnimatedBackground />
      <main>
        <Hero downloadUrl={downloadUrl} />
      </main>
      <span className="app-copyright">© 2026 Codec.</span>
    </div>
  );
}

export default App;
