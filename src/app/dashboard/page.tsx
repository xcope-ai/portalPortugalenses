import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import styles from './dashboard.module.css'; // Vamos criar este ficheiro CSS a seguir
import { MdPeople, MdDescription, MdAttachMoney, MdWarning } from 'react-icons/md'; // Exemplo de icons

// Componente placeholder para um cartão de estatística (inspirado na imagem)
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentageChange?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  percentageChange,
  changeType = 'neutral',
}) => {
  const changeColor = changeType === 'increase' ? styles.increase : changeType === 'decrease' ? styles.decrease : '';

  return (
    <div className={styles.statsCard}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {percentageChange && (
          <div className={`${styles.percentageChange} ${changeColor}`}>
            {changeType === 'increase' && '↑'}
            {changeType === 'decrease' && '↓'}
            {percentageChange} este mês
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  // Aqui, no futuro, você obteria os dados reais para o dashboard
  const totalClients = 127; // Exemplo
  const activePolicies = 215; // Exemplo
  const pendingRenewals = 14; // Exemplo
  const monthlyRevenue = 12450.50; // Exemplo

  return (
    <DefaultLayout>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.pageTitle}>Dashboard</h1>

        {/* Secção de Cartões de Estatísticas */}
        <div className={styles.statsCardsGrid}>
          <StatsCard
            title="Total de Clientes"
            value={totalClients}
            icon={<MdPeople size={24} />}
            percentageChange="12%"
            changeType="increase"
          />
          <StatsCard
            title="Apólices Ativas" // Ou outro título relevante para o seu negócio
            value={activePolicies}
            icon={<MdDescription size={24} />}
            percentageChange="5%"
            changeType="increase"
          />
           <StatsCard
            title="Renovações Pendentes" // Ou outro título relevante para o seu negócio
            value={pendingRenewals}
            icon={<MdWarning size={24} />}
            percentageChange="3%"
            changeType="decrease"
          />
          <StatsCard
            title="Receita Mensal"
            value={`${monthlyRevenue.toFixed(2)} €`}
            icon={<MdAttachMoney size={24} />}
            percentageChange="8.5%"
            changeType="increase"
          />
          {/* Adicionar mais StatsCards conforme necessário */}
        </div>

        {/* Secção para Últimos Documentos/Faturas */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Últimos Documentos/Faturas</h2>
          {/* Aqui você listaria os documentos/faturas recentes */}
          <div className={styles.placeholderCard}>Lista de últimos documentos/faturas</div>
        </div>

        {/* Secção para Faturas Vencidas ou Próximas do Vencimento */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Faturas Vencidas ou Próximas do Vencimento</h2>
          {/* Aqui você listaria as faturas com problemas de vencimento */}
           <div className={styles.placeholderCard}>Lista de faturas vencidas ou próximas do vencimento</div>
        </div>

        {/* Secção para Resumo de Serviços */}
         <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumo de Serviços</h2>
          {/* Aqui você mostraria métricas sobre serviços */}
           <div className={styles.placeholderCard}>Gráficos ou tabelas de resumo de serviços</div>
        </div>

         {/* Secção para Faturação e Perdas */}
         <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Faturação e Perdas</h2>
          {/* Aqui você mostraria gráficos ou resumos financeiros */}
           <div className={styles.placeholderCard}>Gráficos ou tabelas de faturação e perdas</div>
        </div>

        {/* Adicionar outras secções relevantes */}

      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
