export type BrowserFamily = "edge" | "chrome" | "firefox" | "safari" | "unknown"

const downloadHints: Record<BrowserFamily, string> = {
  edge: "Look for Edge’s Downloads button in the top-right toolbar.",
  chrome: "Look for Chrome’s download tray at the top right.",
  firefox: "Look for Firefox’s Downloads arrow in the toolbar.",
  safari: "Look for Safari’s Downloads button near the top right.",
  unknown: "Open your browser’s downloads to find the installer.",
}

export function getBrowserFamily(userAgent: string): BrowserFamily {
  if (/Edg(?:A|iOS)?\//i.test(userAgent)) return "edge"
  if (/Firefox\/|FxiOS\//i.test(userAgent)) return "firefox"
  if (/Chrome\/|CriOS\//i.test(userAgent)) return "chrome"
  if (/Safari\//i.test(userAgent)) return "safari"
  return "unknown"
}

export function getDownloadHint(userAgent: string) {
  return downloadHints[getBrowserFamily(userAgent)]
}
