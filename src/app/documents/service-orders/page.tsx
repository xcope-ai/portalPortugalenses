'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import documentsData from '@/data/documents.json';

export default function ServiceOrdersPage() {
  const { t } = useI18n();
  const serviceOrders = documentsData.documents.filter(doc => doc.type === 'service_order');
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'clientId', header: t('common.client') },
    { key: 'date', header: t('common.orderDate') },
    { key: 'status', header: t('common.status') },
    { key: 'amount', header: t('common.value') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('documents.viewServiceOrders')}>
        <DataTable
          columns={columns}
          data={serviceOrders}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
