import { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
