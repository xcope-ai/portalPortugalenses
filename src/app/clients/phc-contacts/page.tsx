'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import clientsData from '@/data/clients.json';

// For demo, use clients as contacts (you can adjust fields as needed)
const contacts = clientsData.clients.map(client => ({
  id: client.id,
  name: client.name,
  company: client.name,
  position: 'Contact',
  email: client.email,
  phone: client.contact
}));

export default function PhcContactsPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'name', header: t('common.name') },
    { key: 'company', header: t('common.company') },
    { key: 'position', header: t('common.position') },
    { key: 'email', header: t('common.email') },
    { key: 'phone', header: t('common.phone') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('clients.phcContacts')} showBackButton>
        <DataTable
          columns={columns}
          data={contacts}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
