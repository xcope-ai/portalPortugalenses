"use client";

import { useI18n } from '@/lib/i18n';
import LoginForm from '@/components/LoginForm/LoginForm';
import LoginHeader from '@/components/LoginHeader/LoginHeader';
import styles from './page.module.css';
import Image from 'next/image';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <div className="loginBackground"></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.loginPage}>
          <div className={styles.backgroundContainer}>
            <div className={styles.backgroundImage}></div>
          </div>
          <LoginHeader />
          <div className={styles.loginContainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
