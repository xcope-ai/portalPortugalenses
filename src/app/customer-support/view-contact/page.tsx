'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';

// Mock data for Contact Requests
const mockContactRequests = [
  {
    requestId: 'CR-2025-001',
    subject: 'Delivery Inquiry',
    status: 'Pending',
    dateSubmitted: '2025-05-15',
  },
  {
    requestId: 'CR-2025-002',
    subject: 'Account Information Update',
    status: 'In Progress',
    dateSubmitted: '2025-05-18',
  },
  {
    requestId: 'CR-2025-003',
    subject: 'Service Availability Question',
    status: 'Completed',
    dateSubmitted: '2025-05-20',
  },
];

export default function ViewContactRequestsPage() {
  const { t } = useI18n();
  const [contactRequests, setContactRequests] = useState(mockContactRequests);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'requestId', header: t('common.id') },
    { key: 'subject', header: t('common.subject') },
    { 
      key: 'status', 
      header: t('common.status'),
      render: (value: string) => {
        let className = '';
        let translatedValue = value;
        
        switch (value) {
          case 'Completed':
            className = 'status-active';
            translatedValue = t('common.completed');
            break;
          case 'Pending':
          case 'In Progress':
            className = '';
            translatedValue = value === 'Pending' ? t('common.pending') : t('common.inProgress');
            break;
          default:
            className = 'status-inactive';
        }
        return <span className={className}>{translatedValue}</span>;
      }
    },
    { key: 'dateSubmitted', header: t('common.submissionDate') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('customerSupport.viewContactRequests')}>
        <DataTable
          columns={columns}
          data={contactRequests}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
