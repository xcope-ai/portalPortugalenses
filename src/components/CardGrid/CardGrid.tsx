import { ReactNode } from 'react';
import styles from './CardGrid.module.css';

interface CardGridProps {
  children: ReactNode;
  columns?: number;
}

const CardGrid = ({ children, columns = 3 }: CardGridProps) => {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  );
};

export default CardGrid;
