'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaPhone, FaClipboardList, FaExclamationCircle, FaSearch } from 'react-icons/fa';

export default function CustomerSupportPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.customerSupport')}>
        <CardGrid columns={2}>
          <GlassmorphismCard
            title={t('customerSupport.newContactRequest')}
            description={t('customerSupport.requestContact')}
            linkTo="/customer-support/new-contact"
            icon={<FaPhone />}
          />
          <GlassmorphismCard
            title={t('customerSupport.viewContactRequests')}
            description={t('customerSupport.reviewContactRequests')}
            linkTo="/customer-support/view-contact"
            icon={<FaClipboardList />}
          />
          <GlassmorphismCard
            title={t('customerSupport.newComplaint')}
            description={t('customerSupport.submitComplaint')}
            linkTo="/customer-support/new-complaint"
            icon={<FaExclamationCircle />}
          />
          <GlassmorphismCard
            title={t('customerSupport.viewComplaints')}
            description={t('customerSupport.reviewComplaints')}
            linkTo="/customer-support/view-complaints"
            icon={<FaSearch />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
