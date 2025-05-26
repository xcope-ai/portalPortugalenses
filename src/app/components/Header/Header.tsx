'use client';

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Header.module.css'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem('userEmail');
    // Here you would typically clear any auth tokens/session
    // For now, we'll just redirect to the sign in page
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/big_logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className={styles.userInfo} ref={dropdownRef}>
        <button 
          className={styles.userButton}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <span className={styles.userName}>{userEmail}</span>
          <i className={`bi bi-chevron-down ${styles.dropdownIcon} ${isDropdownOpen ? styles.rotate : ''}`}></i>
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Link href="/profile" className={styles.dropdownItem}>
              <i className="bi bi-person"></i>
              Profile
            </Link>
            <Link href="/settings" className={styles.dropdownItem}>
              <i className="bi bi-gear"></i>
              Settings
            </Link>
            <div className={styles.dropdownDivider}></div>
            <button onClick={handleSignOut} className={styles.dropdownItem}>
              <i className="bi bi-box-arrow-right"></i>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header