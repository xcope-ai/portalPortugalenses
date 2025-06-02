import { useI18n } from '@/lib/i18n';
import styles from './Footer.module.css';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const { t } = useI18n();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.companyInfo}>
        <p>© {new Date().getFullYear()} Portugalenses</p>
      </div>
      
      <div className={styles.contactInfo}>
        <p>contact@Portugalenses.com | +1 234 567 890</p>
      </div>
      
      <div className={styles.socialLinks}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className={styles.socialIcon} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className={styles.socialIcon} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook className={styles.socialIcon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
