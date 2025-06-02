'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormField from '@/components/FormField/FormField';
import Button from '@/components/Button/Button';

export default function AddFilePage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    certificationType: '',
    expiryDate: '',
    file: '',
    description: '',
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
    console.log('Certification file uploaded:', formData);
    alert(t('forms.fileUploaded'));
  };
  
  const certificationTypeOptions = [
    { value: 'iso9001', label: t('forms.iso9001') },
    { value: 'iso14001', label: t('forms.iso14001') },
    { value: 'gdpr', label: t('forms.gdprCompliance') },
    { value: 'safety', label: t('forms.safetyCertification') },
    { value: 'other', label: t('forms.other') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('certifications.addNewFile')}>
        <FormContainer title={t('forms.uploadCertification')} onSubmit={handleSubmit}>
          <FormField
            label={t('forms.certificationType')}
            id="certificationType"
            type="select"
            value={formData.certificationType}
            onChange={handleChange}
            options={certificationTypeOptions}
            required
          />
          
          <FormField
            label={t('forms.expiryDate')}
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          
          <FormField
            label={t('forms.file')}
            id="file"
            type="file"
            value={formData.file}
            onChange={handleChange}
            required
          />
          
          <FormField
            label={t('forms.description')}
            id="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
          />
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <Button type="submit" variant="primary">
              {t('forms.uploadFile')}
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
