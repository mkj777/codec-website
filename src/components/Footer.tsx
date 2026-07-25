import logoIcon from "../assets/icon.png";
import "./components.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="/" className="footer-logo">
          <img src={logoIcon} alt="Codec Logo" className="footer-logo-icon" />
          <span className="footer-logo-text">Codec</span>
        </a>
        <p className="footer-copyright">© {currentYear} Codec.</p>
      </div>
    </footer>
  );
}
