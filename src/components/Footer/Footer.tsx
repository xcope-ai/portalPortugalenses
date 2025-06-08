import { useI18n } from '@/lib/i18n';
import styles from './Footer.module.css';
import { FaHeadset, FaRegClock, FaGlobeAmericas, FaBoxOpen } from 'react-icons/fa';

const Footer = () => {
  const { t } = useI18n();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>
            <FaHeadset className={styles.columnIcon} />
            <h3 className={styles.columnTitle}>Apoio ao Cliente</h3>
          </div>
          <p className={styles.contactText}>Entre em contacto connosco!</p>
          <p className={styles.contactText}>+351 22 745 20 96</p>
          <p className={styles.contactText}>geral@portugalenses.pt</p>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>
            <FaRegClock className={styles.columnIcon} />
            <h3 className={styles.columnTitle}>Horário</h3>
          </div>
          <p className={styles.scheduleText}>Segunda - Sexta: 09:00 às 19:00</p>
          <p className={styles.scheduleText}>Sábado: 09:00 às 13:00</p>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>
            <FaGlobeAmericas className={styles.columnIcon} />
            <h3 className={styles.columnTitle}>A nossa localização</h3>
          </div>
          <p className={styles.locationText}>Rua do Coteiro, 271</p>
          <p className={styles.locationText}>4415-451 Grijó Vila Nova de Gaia</p>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.columnHeader}>
            <FaBoxOpen className={styles.columnIcon} />
            <h3 className={styles.columnTitle}>PEDIDO DE COTAÇÃO</h3>
          </div>
          <p className={styles.quoteSubTitle}>PARA</p>
          <select className={styles.serviceSelect}>
            <option value="">Selecionar Serviço</option>
            <option value="transporte">Transporte</option>
            <option value="logistica">Logística</option>
            <option value="armazenamento">Armazenamento</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
