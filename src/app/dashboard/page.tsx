"use client";

import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import styles from './dashboard.module.css';
import { MdPeople, MdDescription, MdAttachMoney } from 'react-icons/md';
import { FaFileInvoice } from 'react-icons/fa';
import { useI18n } from '@/lib/i18n';

// Componente placeholder para um cartão de estatística
interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentageChange: string;
  isIncrease: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, percentageChange, isIncrease }) => {
  const percentageClassName = isIncrease ? styles.percentageIncrease : styles.percentageDecrease;

  return (
    <div className={styles.statsCard}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.cardContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        <div className={percentageClassName}>
          {percentageChange}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { t } = useI18n();

  // Aqui, no futuro, você obteria os dados reais para o dashboard
  const totalClients = '127';
  const activePolicies = '215';
  const overdueInvoices = '7';
  const monthlyRevenue = '12450.50 €';

  return (
    <DefaultLayout>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.pageTitle}>{t('dashboard.pageTitle')}</h1>

        {/* Secção de Cartões de Estatísticas */}
        <div className={styles.statsCardsGrid}>
          <StatsCard
            icon={<MdPeople size={24} />}
            title={t('dashboard.TotalClients')}
            value={totalClients}
            percentageChange={t('dashboard.percentageIncrease', { percentage: '12', thisMonth: t('common.ThisMonth') })}
            isIncrease={true}
          />
          <StatsCard
            icon={<MdDescription size={24} />}
            title={t('dashboard.ActivePolicies')}
            value={activePolicies}
            percentageChange={t('dashboard.percentageIncrease', { percentage: '5', thisMonth: t('common.ThisMonth') })}
            isIncrease={true}
          />
          <StatsCard
            icon={<FaFileInvoice size={24} />}
            title={t('dashboard.OverdueInvoices')}
            value={overdueInvoices}
            percentageChange={t('dashboard.percentageDecrease', { percentage: '15', thisMonth: t('common.ThisMonth') })}
            isIncrease={false}
          />
          <StatsCard
            icon={<MdAttachMoney size={24} />}
            title={t('dashboard.MonthlyRevenue')}
            value={monthlyRevenue}
            percentageChange={t('dashboard.percentageIncrease', { percentage: '8.5', thisMonth: t('common.ThisMonth') })}
            isIncrease={true}
          />
          {/* Adicionar mais StatsCards conforme necessário */}
        </div>

        {/* Secção para Últimos Documentos/Faturas */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('dashboard.LastDocuments')}</h2>
          <div className={styles.placeholderCard}>{t('dashboard.ListOfLastDocuments')}</div>
        </div>

        {/* Secção para Faturas Vencidas ou Próximas do Vencimento */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('dashboard.OverdueInvoices')}</h2>
          <div className={styles.placeholderCard}>{t('dashboard.ListOfOverdueInvoices')}</div>
        </div>

        {/* Secção para Resumo de Serviços */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('dashboard.ServicesSummary')}</h2>
          <div className={styles.placeholderCard}>{t('dashboard.PlotsOfServicesSummary')}</div>
        </div>

        {/* Secção para Faturação e Perdas */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('dashboard.RevenueAndLosses')}</h2>
          <div className={styles.placeholderCard}>{t('dashboard.PlotsOfRevenueAndLosses')}</div>
        </div>

        {/* Adicionar outras secções relevantes */}

      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
