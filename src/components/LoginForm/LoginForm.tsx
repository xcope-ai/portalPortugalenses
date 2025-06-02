import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { t } = useI18n();
  const { login } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = t('forms.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('forms.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('forms.passwordRequired');
    }
    
    if (!formData.captcha) {
      newErrors.captcha = t('forms.captchaRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        router.push('/');
      } else {
        setErrors({
          ...errors,
          general: t('forms.invalidCredentials'),
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: t('forms.loginError'),
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>{t('forms.portalTitle')}</h2>
        
        {errors.general && (
          <div className={styles.errorMessage}>{errors.general}</div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && (
              <div className={styles.errorText}>{errors.email}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && (
              <div className={styles.errorText}>{errors.password}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="captcha">{t('auth.captcha')}</label>
            <div className={styles.captchaContainer}>
              <div className={styles.captchaImage}>
                {/* This would be a real CAPTCHA image in production */}
                CAPTCHA
              </div>
              <input
                type="text"
                id="captcha"
                value={formData.captcha}
                onChange={handleChange}
                className={errors.captcha ? styles.inputError : ''}
              />
            </div>
            {errors.captcha && (
              <div className={styles.errorText}>{errors.captcha}</div>
            )}
          </div>
          
          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : t('auth.loginButton')}
          </button>
          
          <div className={styles.forgotPassword}>
            <a href="#">{t('auth.forgotPassword')}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
