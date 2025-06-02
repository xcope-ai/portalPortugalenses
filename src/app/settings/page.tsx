'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormField from '@/components/FormField/FormField';
import Button from '@/components/Button/Button';

export default function SettingsPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    language: 'en',
    theme: 'light',
    notifications: 'all',
    email: 'user@example.com',
    name: 'John Doe',
    phone: '+1 234 567 890',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to an API
    console.log('Settings updated:', formData);
    alert(t('forms.settingsUpdated'));
  };
  
  const languageOptions = [
    { value: 'en', label: t('forms.english') },
    { value: 'pt', label: t('forms.portuguese') },
    { value: 'it', label: t('forms.italian') },
  ];
  
  const themeOptions = [
    { value: 'light', label: t('forms.lightTheme') },
    { value: 'dark', label: t('forms.darkTheme') },
    { value: 'system', label: t('forms.systemTheme') },
  ];
  
  const notificationOptions = [
    { value: 'all', label: t('forms.allNotifications') },
    { value: 'important', label: t('forms.importantOnly') },
    { value: 'none', label: t('forms.noNotifications') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('navigation.settings')}>
        <div className="settings-container">
          <FormContainer title={t('forms.profileSettings')} onSubmit={handleSubmit}>
            <FormField
              label={t('forms.name')}
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <FormField
                label={t('forms.email')}
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              
              <FormField
                label={t('forms.phone')}
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <Button type="submit" variant="primary">
                {t('forms.saveProfile')}
              </Button>
            </div>
          </FormContainer>
          
          <FormContainer title={t('forms.appearanceSettings')} onSubmit={handleSubmit}>
            <FormField
              label={t('forms.language')}
              id="language"
              type="select"
              value={formData.language}
              onChange={handleChange}
              options={languageOptions}
            />
            
            <FormField
              label={t('forms.theme')}
              id="theme"
              type="select"
              value={formData.theme}
              onChange={handleChange}
              options={themeOptions}
            />
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <Button type="submit" variant="primary">
                {t('forms.saveAppearance')}
              </Button>
            </div>
          </FormContainer>
          
          <FormContainer title={t('forms.notificationSettings')} onSubmit={handleSubmit}>
            <FormField
              label={t('forms.notificationPreferences')}
              id="notifications"
              type="select"
              value={formData.notifications}
              onChange={handleChange}
              options={notificationOptions}
            />
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <Button type="submit" variant="primary">
                {t('forms.saveNotifications')}
              </Button>
            </div>
          </FormContainer>
        </div>
      </PageContainer>
    </DefaultLayout>
  );
}
