'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaUsers, FaClipboardList, FaClock } from 'react-icons/fa';

export default function ClientsPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.clients')}>
        <CardGrid columns={3}>
          <GlassmorphismCard
            title={t('clients.phcClients')}
            description={t('clients.manageClients')}
            linkTo="/clients/phc-clients"
            icon={<FaUsers />}
          />
          <GlassmorphismCard
            title={t('clients.phcContacts')}
            description={t('clients.manageContacts')}
            linkTo="/clients/phc-contacts"
            icon={<FaClipboardList />}
          />
          <GlassmorphismCard
            title={t('clients.approvalPendingRequests')}
            description={t('clients.reviewRequests')}
            linkTo="/clients/approval-pending"
            icon={<FaClock />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
