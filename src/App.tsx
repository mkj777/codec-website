import { useEffect, useState } from "react"

import { Hero } from "@/components/Hero"
import {
  fetchLatestDownloadUrl,
  WINDOWS_INSTALLER_DOWNLOAD_URL,
} from "@/lib/github"
import { NotFound } from "@/pages/NotFound"

function App() {
  const [downloadUrl, setDownloadUrl] = useState(WINDOWS_INSTALLER_DOWNLOAD_URL)
  const path = window.location.pathname
  const isNotFound = path !== "/" && path !== "/index.html"

  useEffect(() => {
    if (isNotFound) return

    let isActive = true

    const syncLatestDownloadUrl = async () => {
      try {
        const latestDownloadUrl = await fetchLatestDownloadUrl()

        if (isActive) {
          setDownloadUrl(latestDownloadUrl)
        }
      } catch (error) {
        console.error("Failed to resolve latest Codec download URL.", error)
      }
    }

    void syncLatestDownloadUrl()

    return () => {
      isActive = false
    }
  }, [isNotFound])

  if (isNotFound) {
    return <NotFound />
  }

  return <Hero downloadUrl={downloadUrl} />
}

export default App
