import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { usePathname } from 'next/navigation';
import { FaUsers, FaFileAlt, FaTruck, FaBox, FaHeadset, FaAward, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  const navigationItems = [
    { id: 'clients', label: t('navigation.clients'), path: '/clients', icon: <FaUsers /> },
    { id: 'documents', label: t('navigation.documents'), path: '/documents', icon: <FaFileAlt /> },
    { id: 'transports', label: t('navigation.transports'), path: '/transports', icon: <FaTruck /> },
    { id: 'logistics', label: t('navigation.logistics'), path: '/logistics', icon: <FaBox /> },
    { id: 'customerSupport', label: t('navigation.customerSupport'), path: '/customer-support', icon: <FaHeadset /> },
    { id: 'certifications', label: t('navigation.certifications'), path: '/certifications', icon: <FaAward /> },
    { id: 'settings', label: t('navigation.settings'), path: '/settings', icon: <FaCog /> },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id} className={isActive(item.path) ? styles.active : ''}>
              <Link href={item.path}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
