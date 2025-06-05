'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormField from '@/components/FormField/FormField';
import Button from '@/components/Button/Button';

export default function NewComplaintPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    complaintType: '',
    subject: '',
    description: '',
    orderNumber: '',
    attachFile: '',
    name: '',
    email: '',
    phone: '',
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
    console.log('Complaint submitted:', formData);
    alert(t('forms.complaintSubmitted'));
  };
  
  const complaintTypeOptions = [
    { value: 'service', label: t('forms.serviceQuality') },
    { value: 'delivery', label: t('forms.deliveryIssue') },
    { value: 'damage', label: t('forms.cargoDamage') },
    { value: 'billing', label: t('forms.billingProblem') },
    { value: 'other', label: t('forms.other') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('customerSupport.newComplaint')} showBackButton>
        <FormContainer title={t('forms.submitComplaint')} onSubmit={handleSubmit}>
          <FormField
            label={t('forms.complaintType')}
            id="complaintType"
            type="select"
            value={formData.complaintType}
            onChange={handleChange}
            options={complaintTypeOptions}
            required
          />
          
          <FormField
            label={t('common.subject')}
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          
          <FormField
            label={t('common.description')}
            id="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />
          
          <FormField
            label={t('forms.orderReference')}
            id="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
          />
          
          <FormField
            label={t('forms.attachFile')}
            id="attachFile"
            type="file"
            value={formData.attachFile}
            onChange={handleChange}
          />
          
          <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>{t('forms.contactInformation')}</h3>
          
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
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <Button type="submit" variant="primary">
              {t('forms.submitComplaint')}
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
