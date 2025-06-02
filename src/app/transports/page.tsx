'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaFileAlt, FaSearch } from 'react-icons/fa';

export default function TransportsPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.transports')}>
        <CardGrid columns={2}>
          <GlassmorphismCard
            title={t('transports.newRequest')}
            description={t('transports.submitRequest')}
            linkTo="/transports/new-request"
            icon={<FaFileAlt />}
          />
          <GlassmorphismCard
            title={t('transports.checkRequests')}
            description={t('transports.monitorRequests')}
            linkTo="/transports/check-requests"
            icon={<FaSearch />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
