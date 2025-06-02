import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import styles from './DataTable.module.css';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  filters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;
}

const DataTable = ({
  columns,
  data,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  filters = {},
  onFilterChange,
}: DataTableProps) => {
  const { t } = useI18n();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableControls}>
        <div className={styles.pageSize}>
          <label htmlFor="pageSize">{t('common.show')}:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row) => (
              <tr key={row.id || row._id || JSON.stringify(row)}>
                {columns.map((column) => (
                  <td key={`${row.id || row._id || JSON.stringify(row)}-${column.key}`}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                {t('common.noResults')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('common.previous')}
          </button>
          
          <span className={styles.pageInfo}>
            {t('common.page')} {currentPage} {t('common.of')} {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
