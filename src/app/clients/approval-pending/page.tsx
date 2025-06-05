'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';

// Mock data for Approval Pending Requests
const mockPendingRequests = [
  {
    id: 'PR001',
    companyName: 'NewTech Solutions',
    contactPerson: 'Michael Brown',
    email: 'michael@newtech.com',
    phone: '+1 567 890 123',
    dateSubmitted: '2025-05-10',
    status: 'Pending',
  },
  {
    id: 'PR002',
    companyName: 'EcoTransport Inc',
    contactPerson: 'Sarah Wilson',
    email: 'sarah@ecotransport.com',
    phone: '+1 678 901 234',
    dateSubmitted: '2025-05-12',
    status: 'Pending',
  },
  {
    id: 'PR003',
    companyName: 'FastFreight Services',
    contactPerson: 'David Miller',
    email: 'david@fastfreight.com',
    phone: '+1 789 012 345',
    dateSubmitted: '2025-05-15',
    status: 'Under Review',
  },
];

export default function ApprovalPendingPage() {
  const { t } = useI18n();
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'companyName', header: t('common.companyName') },
    { key: 'contactPerson', header: t('common.contactPerson') },
    { key: 'email', header: t('common.email') },
    { key: 'phone', header: t('common.phone') },
    { key: 'dateSubmitted', header: t('common.submissionDate') },
    { 
      key: 'status', 
      header: t('common.status'),
      render: (value: string) => {
        let translatedValue = value;
        switch (value) {
          case 'Pending':
            translatedValue = t('common.pending');
            break;
          case 'Under Review':
            translatedValue = t('common.underReview');
            break;
          case 'Approved':
            translatedValue = t('common.approved');
            break;
          case 'Rejected':
            translatedValue = t('common.rejected');
            break;
        }
        return (
        <span className={value === 'Approved' ? 'status-active' : ''}>
            {translatedValue}
        </span>
        );
      },
    },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('clients.approvalPendingRequests')} showBackButton>
        <DataTable
          columns={columns}
          data={pendingRequests}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
