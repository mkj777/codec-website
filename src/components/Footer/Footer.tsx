import styles from './Footer.module.css';
import logoIcon from '../../assets/icon.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src={logoIcon} alt="Codec Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Codec</span>
        </a>
        {/* <p className={styles.copyright}>
              Made with ❤️  
            </p> */}
        <p className={styles.copyright}>
          © {currentYear} Codec.
        </p>
      </div>
    </footer>
  );
}
