'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

interface SearchResult {
  path: string;
  title: string;
  category: string;
}

export default function SearchBar() {
  const { t } = useI18n();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Define searchable pages with their paths and translation keys
  const searchablePages: SearchResult[] = [
    // Clients section
    { path: '/clients/phc-clients', title: t('clients.phcClients'), category: t('navigation.clients') },
    { path: '/clients/phc-contacts', title: t('clients.phcContacts'), category: t('navigation.clients') },
    { path: '/clients/approval-pending', title: t('clients.approvalPendingRequests'), category: t('navigation.clients') },
    
    // Documents section
    { path: '/documents/service-orders', title: t('documents.viewServiceOrders'), category: t('navigation.documents') },
    { path: '/documents/management', title: t('documents.documentManagement'), category: t('navigation.documents') },
    { path: '/documents/checking-account', title: t('documents.checkingAccount'), category: t('navigation.documents') },
    
    // Transports section
    { path: '/transports/new-request', title: t('transports.newRequest'), category: t('navigation.transports') },
    { path: '/transports/check-requests', title: t('transports.checkRequests'), category: t('navigation.transports') },
    
    // Customer Support section
    { path: '/customer-support/new-contact', title: t('customerSupport.newContactRequest'), category: t('navigation.customerSupport') },
    { path: '/customer-support/view-contact', title: t('customerSupport.viewContactRequests'), category: t('navigation.customerSupport') },
    { path: '/customer-support/new-complaint', title: t('customerSupport.newComplaint'), category: t('navigation.customerSupport') },
    { path: '/customer-support/view-complaints', title: t('customerSupport.viewComplaints'), category: t('navigation.customerSupport') },
    
    // Certifications section
    { path: '/certifications/add-file', title: t('certifications.uploadCertifications'), category: t('navigation.certifications') },
    { path: '/certifications/view-files', title: t('certifications.viewCertifications'), category: t('navigation.certifications') },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const searchTermLower = searchQuery.toLowerCase();
    const filteredResults = searchablePages.filter(page => {
      const titleMatch = page.title.toLowerCase().includes(searchTermLower);
      const categoryMatch = page.category.toLowerCase().includes(searchTermLower);
      return titleMatch || categoryMatch;
    });

    setResults(filteredResults);
  }, [searchQuery, t]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={t('common.search')}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
        />
        <button type="submit">
          <FaSearch className={styles.searchIcon} />
        </button>
      </form>

      {showResults && results.length > 0 && (
        <div className={styles.searchResults}>
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result.path)}
              className={styles.searchResult}
            >
              <div className={styles.resultTitle}>{result.title}</div>
              <div className={styles.resultCategory}>{result.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 