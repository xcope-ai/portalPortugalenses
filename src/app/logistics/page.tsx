'use client';

import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import CardGrid from '@/components/CardGrid/CardGrid';
import GlassmorphismCard from '@/components/GlassmorphismCard/GlassmorphismCard';
import { FaBox } from 'react-icons/fa';

export default function LogisticsPage() {
  const { t } = useI18n();
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.logistics')}>
        <div className="placeholder-message">
          <p>Logistics functionality will be available in future updates.</p>
        </div>
        
        <CardGrid columns={1}>
          <GlassmorphismCard
            title="Logistics Overview"
            description="This section will provide logistics management tools and insights."
            linkTo="#"
            icon={<FaBox />}
          />
        </CardGrid>
      </PageContainer>
    </DefaultLayout>
  );
}
