'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import FormContainer from '@/components/FormContainer/FormContainer';
import FormField from '@/components/FormField/FormField';
import Button from '@/components/Button/Button';

export default function NewRequestPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    requestType: '',
    origin: '',
    destination: '',
    cargoType: '',
    weight: '',
    volume: '',
    pickupDate: '',
    deliveryDate: '',
    specialInstructions: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
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
    console.log('Form submitted:', formData);
    alert(t('forms.requestSubmitted'));
  };
  
  const requestTypeOptions = [
    { value: 'quotation', label: t('forms.quotationRequest') },
    { value: 'transport', label: t('forms.transportRequest') },
  ];
  
  const cargoTypeOptions = [
    { value: 'general', label: t('forms.generalCargo') },
    { value: 'hazardous', label: t('forms.hazardousMaterials') },
    { value: 'refrigerated', label: t('forms.refrigeratedGoods') },
    { value: 'oversized', label: t('forms.oversizedCargo') },
  ];
  
  return (
    <DefaultLayout>
      <PageContainer title={t('transports.newRequest')}>
        <FormContainer title={t('transports.submitRequest')} onSubmit={handleSubmit}>
          <FormField
            label={t('forms.requestType')}
            id="requestType"
            type="select"
            value={formData.requestType}
            onChange={handleChange}
            options={requestTypeOptions}
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('forms.origin')}
              id="origin"
              placeholder={t('forms.origin')}
              value={formData.origin}
              onChange={handleChange}
              required
            />
            
            <FormField
              label={t('forms.destination')}
              id="destination"
              placeholder={t('forms.destination')}
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
          
          <FormField
            label={t('forms.cargoType')}
            id="cargoType"
            type="select"
            value={formData.cargoType}
            onChange={handleChange}
            options={cargoTypeOptions}
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('forms.weight')}
              id="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            
            <FormField
              label={t('forms.volume')}
              id="volume"
              type="number"
              value={formData.volume}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('forms.pickupDate')}
              id="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
            
            <FormField
              label={t('forms.deliveryDate')}
              id="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <FormField
            label={t('forms.specialInstructions')}
            id="specialInstructions"
            type="textarea"
            value={formData.specialInstructions}
            onChange={handleChange}
          />
          
          <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>{t('forms.contactInformation')}</h3>
          
          <FormField
            label={t('forms.contactName')}
            id="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField
              label={t('forms.contactEmail')}
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
            
            <FormField
              label={t('forms.contactPhone')}
              id="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <Button type="submit" variant="primary">
              {t('forms.submitRequest')}
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
