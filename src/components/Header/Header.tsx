import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import styles from './Header.module.css';
import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const { t, changeLanguage, currentLanguage, languages } = useI18n();
  const { isAuthenticated, logout } = useAuth();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const getLanguageLabel = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'pt': return 'Português';
      case 'it': return 'Italiano';
      default: return code;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/big_logo.png" alt="Company Logo" />
        </Link>
      </div>
      
      {isAuthenticated && (
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      )}
      
      <div className={styles.rightSection}>
        <div className={styles.languagePicker}>
          <button onClick={toggleLanguageDropdown} className={styles.languageButton}>
            {getLanguageLabel(currentLanguage)}
            <span className={styles.dropdownIcon}>▼</span>
          </button>
          
          {isLanguageDropdownOpen && (
            <div className={styles.languageDropdown}>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={lang === currentLanguage ? styles.activeLanguage : ''}
                >
                  {getLanguageLabel(lang)}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {isAuthenticated ? (
          <button className={styles.authButton} onClick={logout}>
            {t('common.logout')}
          </button>
        ) : (
          <Link href="/login" className={styles.authButton}>
            {t('common.login')}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
