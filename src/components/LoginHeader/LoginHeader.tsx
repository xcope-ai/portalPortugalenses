'use client';

import { useI18n } from '@/lib/i18n';
import styles from './LoginHeader.module.css';
import Image from 'next/image';

const LoginHeader = () => {
  const { t } = useI18n();
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/big_logo.png"
          alt="Logo"
          width={200}
          height={60}
          priority
        />
      </div>
      <div className={styles.languagePicker}>
        <select className={styles.languageSelect}>
          <option value="en">English</option>
          <option value="pt">Português</option>
          <option value="it">Italiano</option>
        </select>
      </div>
    </header>
  );
};

export default LoginHeader; 