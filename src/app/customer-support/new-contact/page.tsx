'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormField from '@/components/FormField/FormField';
import Button from '@/components/Button/Button';

export default function NewContactRequestPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContactMethod: '',
    bestTimeToContact: '',
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
    console.log('Contact request submitted:', formData);
    alert(t('forms.contactRequestSubmitted'));
  };
  
  const contactMethodOptions = [
    { value: 'email', label: t('common.email') },
    { value: 'phone', label: t('common.phone') },
  ];
  
  const timeOptions = [
    { value: 'morning', label: t('forms.morningTime') },
    { value: 'afternoon', label: t('forms.afternoonTime') },
    { value: 'evening', label: t('forms.eveningTime') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('customerSupport.newContactRequest')} showBackButton>
        <FormContainer title={t('forms.requestContact')} onSubmit={handleSubmit}>
          <FormField
            label={t('common.name')}
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('common.email')}
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <FormField
              label={t('common.phone')}
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <FormField
            label={t('common.subject')}
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          
          <FormField
            label={t('forms.message')}
            id="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('forms.preferredContactMethod')}
              id="preferredContactMethod"
              type="select"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              options={contactMethodOptions}
              required
            />
            
            <FormField
              label={t('forms.bestTimeToContact')}
              id="bestTimeToContact"
              type="select"
              value={formData.bestTimeToContact}
              onChange={handleChange}
              options={timeOptions}
              required
            />
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <Button type="submit" variant="primary">
              {t('forms.submit')}
            </Button>
            
            <Button type="button" variant="outline">
              {t('forms.cancel')}
            </Button>
          </div>
        </FormContainer>
      </PageContainer>
    </DefaultLayout>
  );
}
