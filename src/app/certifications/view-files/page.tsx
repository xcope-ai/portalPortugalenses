'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import certificationsData from '@/data/certifications.json';

export default function ViewFilesPage() {
  const { t } = useI18n();
  const [certifications, setCertifications] = useState(certificationsData.certifications);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('certifications.certificateId') },
    { key: 'name', header: t('certifications.type') },
    { key: 'issueDate', header: t('certifications.uploadDate') },
    { key: 'expiryDate', header: t('certifications.expiryDate') },
    { 
      key: 'status', 
      header: t('certifications.status'),
      render: (value: string) => {
        let className = '';
        let translatedValue = value;
        switch (value) {
          case 'valid':
            className = 'status-active';
            translatedValue = t('certifications.valid');
            break;
          case 'expired':
            className = 'status-inactive';
            translatedValue = t('certifications.expired');
            break;
          default:
            className = '';
        }
        return <span className={className}>{translatedValue}</span>;
      }
    },
    {
      key: 'actions',
      header: t('certifications.actions'),
      render: () => (
        <div className="action-buttons">
          <button className="view-button">{t('certifications.view')}</button>
          <button className="download-button">{t('certifications.download')}</button>
        </div>
      ),
    },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('certifications.viewFiles')}>
        <DataTable
          columns={columns}
          data={certifications}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
