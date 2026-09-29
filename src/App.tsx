import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { NotFound } from "./pages/NotFound";
import { fetchLatestDownloadUrl, WINDOWS_INSTALLER_DOWNLOAD_URL } from "./lib/github";

function App() {
  const [downloadUrl, setDownloadUrl] = useState(WINDOWS_INSTALLER_DOWNLOAD_URL);
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
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
      <main>
        <Hero downloadUrl={downloadUrl} />
        <About />
        <Features downloadUrl={downloadUrl} />
      </main>
    </div>
  );
}

export default App;
