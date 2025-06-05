'use client';

import { useI18n } from '@/lib/i18n';
import LoginForm from '@/components/LoginForm/LoginForm';
import LoginHeader from '@/components/LoginHeader/LoginHeader';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const lastVisitedPage = localStorage.getItem('lastVisitedPage');
      if (lastVisitedPage && lastVisitedPage !== '/') {
        router.push(lastVisitedPage);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className={styles.loginPage}>
      <div className={styles.backgroundContainer}>
        <Image
          src="/logo.png"
          alt="Background Logo"
          className={styles.backgroundImage}
          width={800}
          height={800}
          priority
        />
      </div>
      <LoginHeader />
      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
