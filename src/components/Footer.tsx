import logoIcon from "../assets/icon.png";
import "./components.css";

export function Footer({ downloadUrl }: { downloadUrl: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container" id="about">
        <div className="footer-cta"><p>Ready to bring your library together?</p><a href={downloadUrl} className="footer-download">Download for Windows</a></div>
        <div className="footer-signature"><img src={logoIcon} alt="Codec Logo" /><span>CODEC</span></div>
        <div className="footer-meta"><p>© {currentYear} Codec.</p><a href="https://github.com/mkj777/codec" target="_blank" rel="noreferrer">GitHub</a></div>
      </div>
    </footer>
  );
}
