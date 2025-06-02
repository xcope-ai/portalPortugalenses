'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaClipboardList, FaFolder, FaMoneyBillWave } from 'react-icons/fa';

export default function DocumentsPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.documents')}>
        <CardGrid columns={3}>
          <GlassmorphismCard
            title={t('documents.viewServiceOrders')}
            description={t('documents.accessServiceOrders')}
            linkTo="/documents/service-orders"
            icon={<FaClipboardList />}
          />
          <GlassmorphismCard
            title={t('documents.documentManagement')}
            description={t('documents.manageDocuments')}
            linkTo="/documents/management"
            icon={<FaFolder />}
          />
          <GlassmorphismCard
            title={t('documents.checkingAccount')}
            description={t('documents.viewCheckingAccount')}
            linkTo="/documents/checking-account"
            icon={<FaMoneyBillWave />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
