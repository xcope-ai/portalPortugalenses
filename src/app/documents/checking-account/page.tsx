'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import DataTable from '@/components/DataTable/DataTable';
import documentsData from '@/data/documents.json';

// For demo, use the documents as transactions (you can adjust fields as needed)
const mockTransactions = documentsData.documents.map((doc, idx) => ({
  id: doc.id,
  date: doc.date,
  description: doc.title,
  debit: idx % 2 === 0 ? `€0.00` : `€${doc.amount}`,
  credit: idx % 2 === 0 ? `€${doc.amount}` : `€0.00`,
  balance: `€${(10000 + idx * 1000).toFixed(2)}`
}));

export default function CheckingAccountPage() {
  const { t } = useI18n();
  const [transactions, setTransactions] = useState(mockTransactions);
  
  const columns = [
    { key: 'id', header: t('common.id') },
    { key: 'date', header: t('common.date') },
    { key: 'description', header: t('common.description') },
    { key: 'debit', header: t('common.debit') },
    { key: 'credit', header: t('common.credit') },
    { key: 'balance', header: t('common.balance') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('documents.checkingAccount')} showBackButton>
        <div className="account-summary">
          <h3>Account Summary</h3>
          <div className="summary-details">
            <p><strong>Current Balance:</strong> €{mockTransactions[mockTransactions.length-1].balance}</p>
            <p><strong>Last Transaction:</strong> {mockTransactions[mockTransactions.length-1].date}</p>
          </div>
        </div>
        
        <h3>Transaction History</h3>
        <DataTable
          columns={columns}
          data={transactions}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
        />
      </PageContainer>
    </DefaultLayout>
  );
}
