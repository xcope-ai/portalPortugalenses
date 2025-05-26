'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Don't render anything until after hydration
  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.sidebar}>
      <nav id="sidebar" className={styles.nav}>
        <ul>
          <li>
            <Link 
              href="/user-data" 
              className={`${styles.navLink} ${isActive('/user-data') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-person"></i>
              Dados do utilizador
            </Link>
          </li>
          <li>
            <Link 
              href="/clients" 
              className={`${styles.navLink} ${isActive('/clients') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-people"></i>
              Clientes
            </Link>
          </li>
          <li>
            <Link 
              href="/documents" 
              className={`${styles.navLink} ${isActive('/documents') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-file-earmark-text"></i>
              Gestão de Documentos
            </Link>
          </li>
          <li>
            <Link 
              href="/transport" 
              className={`${styles.navLink} ${isActive('/transport') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-truck"></i>
              Gestão de Transporte
            </Link>
          </li>
          <li>
            <Link 
              href="/logistics" 
              className={`${styles.navLink} ${isActive('/logistics') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-box-seam"></i>
              Gestão de Logística
            </Link>
          </li>
          <li>
            <Link 
              href="/support" 
              className={`${styles.navLink} ${isActive('/support') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-headset"></i>
              Apoio a clientes
            </Link>
          </li>
          <li>
            <Link 
              href="/certifications" 
              className={`${styles.navLink} ${isActive('/certifications') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-award"></i>
              Certificações
            </Link>
          </li>
          <li className={styles.settingsItem}>
            <button 
              onClick={toggleSettings}
              className={`${styles.navLink} ${styles.settingsButton} ${isActive('/settings') ? styles.active : ''}`}
              aria-expanded={isSettingsOpen}
            >
              <i className="bi bi-gear"></i>
              Configurações
              <i className={`bi bi-chevron-down ${styles.dropdownIcon}`} style={{ marginLeft: 'auto' }}></i>
            </button>
            {isSettingsOpen && (
              <ul className={styles.settingsDropdown}>
                <li>
                  <Link 
                    href="/settings/users" 
                    className={`${styles.navLink} ${styles.dropdownLink} ${isActive('/settings/users') ? styles.active : ''}`}
                    prefetch={true}
                  >
                    Utilizadores
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/reasons" 
                    className={`${styles.navLink} ${styles.dropdownLink} ${isActive('/settings/reasons') ? styles.active : ''}`}
                    prefetch={true}
                  >
                    Motivos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/settings/parameters" 
                    className={`${styles.navLink} ${styles.dropdownLink} ${isActive('/settings/parameters') ? styles.active : ''}`}
                    prefetch={true}
                  >
                    Parâmetros
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
} 