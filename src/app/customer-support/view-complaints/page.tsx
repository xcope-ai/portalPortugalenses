'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';

// Mock data for Complaints
const mockComplaints = [
  {
    complaintId: 'COMP-2025-001',
    subject: 'Delayed Delivery',
    status: 'Under Review',
    dateSubmitted: '2025-05-15',
    complaintType: 'Delivery Issue',
  },
  {
    complaintId: 'COMP-2025-002',
    subject: 'Damaged Cargo',
    status: 'In Progress',
    dateSubmitted: '2025-05-18',
    complaintType: 'Cargo Damage',
  },
  {
    complaintId: 'COMP-2025-003',
    subject: 'Incorrect Billing',
    status: 'Resolved',
    dateSubmitted: '2025-05-20',
    complaintType: 'Billing Problem',
  },
];

export default function ViewComplaintsPage() {
  const { t } = useI18n();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { key: 'complaintId', header: t('common.id') },
    { key: 'subject', header: t('common.subject') },
    { key: 'complaintType', header: t('common.type') },
    { 
      key: 'status', 
      header: t('common.status'),
      render: (value: string) => {
        let className = '';
        let translatedValue = value;
        
        switch (value) {
          case 'Resolved':
            className = 'status-active';
            translatedValue = t('common.resolved');
            break;
          case 'Under Review':
          case 'In Progress':
            className = '';
            translatedValue = value === 'Under Review' ? t('common.underReview') : t('common.inProgress');
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
      <PageContainer title={t('customerSupport.viewComplaints')}>
        <DataTable
          columns={columns}
          data={complaints}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          filters={filters}
          onFilterChange={setFilters}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
