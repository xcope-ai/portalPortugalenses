import { ReactNode } from 'react';
import styles from './GlassmorphismCard.module.css';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

interface GlassmorphismCardProps {
  title: string;
  description: string;
  linkTo: string;
  icon?: ReactNode;
}

const GlassmorphismCard = ({ title, description, linkTo, icon }: GlassmorphismCardProps) => {
  const { t } = useI18n();
  
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={linkTo} className={styles.button}>
        {t('common.goToPage')}
      </Link>
    </div>
  );
};

export default GlassmorphismCard;
