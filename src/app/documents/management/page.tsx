'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import documentsData from '@/data/documents.json';

export default function DocumentManagementPage() {
  const { t } = useI18n();
  const [documents, setDocuments] = useState(documentsData.documents);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'type', header: t('common.type') },
    { key: 'clientId', header: t('common.client') },
    { key: 'date', header: t('common.issueDate') },
    { key: 'status', header: t('common.status') },
    { key: 'amount', header: t('common.amount') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('documents.documentManagement')}>
        <DataTable
          columns={columns}
          data={documents}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
