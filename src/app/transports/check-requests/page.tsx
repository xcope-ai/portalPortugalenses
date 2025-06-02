'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';

// Mock data for Transport Requests
const mockRequests = [
  {
    requestId: 'REQ-2025-001',
    status: 'Pending',
    origin: 'Lisbon, Portugal',
    destination: 'Madrid, Spain',
    submissionDate: '2025-05-15',
    requestType: 'Transport',
  },
  {
    requestId: 'REQ-2025-002',
    status: 'Approved',
    origin: 'Rome, Italy',
    destination: 'Milan, Italy',
    submissionDate: '2025-05-18',
    requestType: 'Quotation',
  },
  {
    requestId: 'REQ-2025-003',
    status: 'In Progress',
    origin: 'Barcelona, Spain',
    destination: 'Paris, France',
    submissionDate: '2025-05-20',
    requestType: 'Transport',
  },
  {
    requestId: 'REQ-2025-004',
    status: 'Completed',
    origin: 'Porto, Portugal',
    destination: 'Seville, Spain',
    submissionDate: '2025-05-22',
    requestType: 'Transport',
  },
];

export default function CheckRequestsPage() {
  const { t } = useI18n();
  const [requests, setRequests] = useState(mockRequests);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'requestId', header: t('common.id') },
    { 
      key: 'status', 
      header: t('common.status'),
      render: (value: string) => {
        let className = '';
        let translatedValue = value;
        
        switch (value) {
          case 'Approved':
          case 'Completed':
            className = 'status-active';
            translatedValue = value === 'Approved' ? t('common.approved') : t('common.completed');
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
    { key: 'origin', header: t('common.origin') },
    { key: 'destination', header: t('common.destination') },
    { key: 'submissionDate', header: t('common.submissionDate') },
    { key: 'requestType', header: t('common.requestType') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('transports.checkRequests')}>
        <DataTable
          columns={columns}
          data={requests}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
