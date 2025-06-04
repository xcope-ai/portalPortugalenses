'use client';

import { useI18n } from '@/lib/i18n';
import styles from './loading.module.css';

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>{t('common.loading')}</p>
    </div>
  );
} 