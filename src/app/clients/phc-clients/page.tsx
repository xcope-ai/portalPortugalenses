'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import clientsData from '@/data/clients.json';

export default function PhcClientsPage() {
  const { t } = useI18n();
  const [clients, setClients] = useState(clientsData.clients);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'name', header: t('common.companyName') },
    { key: 'contactPerson', header: t('common.contactPerson') },
    { key: 'email', header: t('common.email') },
    { key: 'phone', header: t('common.phone') },
    { 
      key: 'status', 
      header: t('common.status'),
      render: (value: string) => (
        <span className={value === 'active' ? 'status-active' : 'status-inactive'}>
          {value === 'active' ? t('common.active') : t('common.inactive')}
        </span>
      ),
    },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('clients.phcClients')} showBackButton>
        <DataTable
          columns={columns}
          data={clients}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
