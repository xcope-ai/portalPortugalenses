'use client';

import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import styles from './dashboard.module.css';
import { FaFileInvoiceDollar, FaChartLine, FaExclamationTriangle, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the earnings/losses chart
const earningsData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Ganhos',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Perdas',
      data: [5000, 7000, 6000, 8000, 9000, 10000],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

// Mock data for recent documents
const recentDocuments = [
  { id: 1, type: 'Fatura', number: 'FAT-2024-001', date: '2024-03-15', amount: '€1.500,00' },
  { id: 2, type: 'Fatura', number: 'FAT-2024-002', date: '2024-03-14', amount: '€2.300,00' },
  { id: 3, type: 'Fatura', number: 'FAT-2024-003', date: '2024-03-13', amount: '€950,00' },
];

// Mock data for overdue invoices
const overdueInvoices = [
  { id: 1, number: 'FAT-2024-001', dueDate: '2024-03-10', amount: '€1.500,00', daysOverdue: 5 },
  { id: 2, number: 'FAT-2024-002', dueDate: '2024-03-08', amount: '€2.300,00', daysOverdue: 7 },
];

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <PageContainer title="Dashboard">
        <div className={styles.dashboardGrid}>
          {/* Summary Cards Container */}
          <div className={styles.infoCardsContainer}>
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <FaFileInvoiceDollar className={styles.infoCardIcon} />
                <h3>Novas Faturas</h3>
              </div>
              <div className={styles.infoCardContent}>
                <p className={styles.infoCardValue}>12</p>
                <p className={styles.infoCardSubtext}>Últimos 7 dias</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <FaMoneyBillWave className={styles.infoCardIcon} />
                <h3>Total de Serviços</h3>
              </div>
              <div className={styles.infoCardContent}>
                <p className={styles.infoCardValue}>€45.750,00</p>
                <p className={styles.infoCardSubtext}>Este mês</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <FaExclamationTriangle className={styles.infoCardIcon} />
                <h3>Faturas Vencidas</h3>
              </div>
              <div className={styles.infoCardContent}>
                <p className={styles.infoCardValue}>2</p>
                <p className={styles.infoCardSubtext}>Requerem atenção</p>
              </div>
            </div>
          </div>

          {/* Earnings/Losses Chart */}
          <div className={styles.chartCard}>
            <h3>Ganhos e Perdas</h3>
            <div className={styles.chartContainer}>
              <Line data={earningsData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
              }} />
            </div>
          </div>

          {/* Recent Documents */}
          <div className={styles.recentDocuments}>
            <h3>Últimos Documentos</h3>
            <div className={styles.documentsList}>
              {recentDocuments.map(doc => (
                <div key={doc.id} className={styles.documentItem}>
                  <div className={styles.documentInfo}>
                    <span className={styles.documentType}>{doc.type}</span>
                    <span className={styles.documentNumber}>{doc.number}</span>
                  </div>
                  <div className={styles.documentDetails}>
                    <span className={styles.documentDate}>{doc.date}</span>
                    <span className={styles.documentAmount}>{doc.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Invoices */}
          <div className={styles.overdueInvoices}>
            <h3>Faturas Vencidas</h3>
            <div className={styles.invoicesList}>
              {overdueInvoices.map(invoice => (
                <div key={invoice.id} className={styles.invoiceItem}>
                  <div className={styles.invoiceInfo}>
                    <span className={styles.invoiceNumber}>{invoice.number}</span>
                    <span className={styles.invoiceDueDate}>Vencimento: {invoice.dueDate}</span>
                  </div>
                  <div className={styles.invoiceDetails}>
                    <span className={styles.invoiceAmount}>{invoice.amount}</span>
                    <span className={styles.daysOverdue}>{invoice.daysOverdue} dias atrasado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </DefaultLayout>
  );
};

export default DashboardPage;