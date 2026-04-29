const GITHUB_OWNER = "mkj777";
const GITHUB_REPO = "codec";

export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
export const GITHUB_RELEASES_URL = `${GITHUB_REPO_URL}/releases`;

const GITHUB_RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=1`;
const WINDOWS_INSTALLER_ASSET_NAME = "Codec-win-setup.exe";

export const WINDOWS_INSTALLER_DOWNLOAD_URL = `${GITHUB_REPO_URL}/releases/latest/download/${WINDOWS_INSTALLER_ASSET_NAME}`;

type GitHubReleaseAsset = {
  browser_download_url: string;
  name: string;
};

type GitHubRelease = {
  assets: GitHubReleaseAsset[];
};

export async function fetchLatestDownloadUrl() {
  const response = await fetch(GITHUB_RELEASES_API_URL);

  if (!response.ok) {
    throw new Error(`GitHub releases request failed with ${response.status}`);
  }

  const releases = (await response.json()) as GitHubRelease[];
  const latestRelease = releases[0];

  if (!latestRelease) {
    return GITHUB_RELEASES_URL;
  }

  const installerAsset =
    latestRelease.assets.find((asset) =>
      asset.name.toLowerCase() === WINDOWS_INSTALLER_ASSET_NAME.toLowerCase(),
    ) ?? latestRelease.assets.find((asset) => asset.name.endsWith(".exe"));

  return installerAsset?.browser_download_url ?? WINDOWS_INSTALLER_DOWNLOAD_URL;
}
