"use client";

import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/lib/auth';
import styles from './DefaultLayout.module.css';
import Image from 'next/image';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.layout}>
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
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className={`${styles.main} ${isAuthenticated ? styles.withSidebar : ''}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default DefaultLayout;
