import { ReactNode } from 'react';
import styles from './FormContainer.module.css';

interface FormContainerProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const FormContainer = ({ title, children, onSubmit }: FormContainerProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
