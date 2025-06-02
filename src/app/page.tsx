'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { useI18n } from '@/lib/i18n';
import { FaUsers, FaFileAlt, FaTruck, FaBox, FaHeadset, FaAward } from 'react-icons/fa';

export default function HomePage() {
  const { t } = useI18n();
  const { isAuthenticated, lastVisitedPage, setLastVisitedPage } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (lastVisitedPage && lastVisitedPage !== '/') {
      router.push(lastVisitedPage);
    }
  }, [isAuthenticated, lastVisitedPage, router]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <DefaultLayout>
      <PageContainer title="Portugalenses Portal">
        <CardGrid columns={3}>
          <GlassmorphismCard
            title={t('navigation.clients')}
            description="Manage your clients and contacts"
            linkTo="/clients"
            icon={<FaUsers />}
          />
          <GlassmorphismCard
            title={t('navigation.documents')}
            description="Access and manage your documents"
            linkTo="/documents"
            icon={<FaFileAlt />}
          />
          <GlassmorphismCard
            title={t('navigation.transports')}
            description="Submit and monitor transport requests"
            linkTo="/transports"
            icon={<FaTruck />}
          />
          <GlassmorphismCard
            title={t('navigation.logistics')}
            description="Manage logistics operations"
            linkTo="/logistics"
            icon={<FaBox />}
          />
          <GlassmorphismCard
            title={t('navigation.customerSupport')}
            description="Contact support and submit complaints"
            linkTo="/customer-support"
            icon={<FaHeadset />}
          />
          <GlassmorphismCard
            title={t('navigation.certifications')}
            description="Manage company certifications"
            linkTo="/certifications"
            icon={<FaAward />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
