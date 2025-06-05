import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
}

const PageContainer = ({ title, children, showBackButton = false }: PageContainerProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {showBackButton && (
          <button onClick={handleBack} className={styles.backButton} aria-label="Go back">
            <FaArrowLeft />
          </button>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
