'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaUpload, FaClipboardList } from 'react-icons/fa';

export default function CertificationsPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.certifications')}>
        <CardGrid columns={2}>
          <GlassmorphismCard
            title={t('certifications.addNewFile')}
            description={t('certifications.uploadCertifications')}
            linkTo="/certifications/add-file"
            icon={<FaUpload />}
          />
          <GlassmorphismCard
            title={t('certifications.files')}
            description={t('certifications.viewCertifications')}
            linkTo="/certifications/view-files"
            icon={<FaClipboardList />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
