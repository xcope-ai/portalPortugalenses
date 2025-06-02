import { useState, useCallback, memo } from 'react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

const LoginForm = memo(() => {
  const { t } = useI18n();
  const { login } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: '',
      }));
    }
  }, [errors]);
  
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = t('forms.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('forms.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('forms.passwordRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({}); // Clear any previous errors
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setErrors({
          general: t('forms.invalidCredentials'),
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: t('forms.loginError'),
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, login, t, validateForm]);
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>{t('forms.portalTitle')}</h2>
        
        {errors.general && (
          <div className={styles.errorMessage} role="alert">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ''}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div className={styles.errorText} id="email-error" role="alert">
                {errors.email}
              </div>
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
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <div className={styles.errorText} id="password-error" role="alert">
                {errors.password}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
            aria-busy={isLoading}
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
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
