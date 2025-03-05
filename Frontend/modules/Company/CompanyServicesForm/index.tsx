import React, { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import { api } from '@helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormTitle from 'components/FormTitle';
import KeyboardAvoidingContainer from 'components/KeyboardAvoidingContainer';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Text, TextInput } from 'react-native-paper';

import { validateServiceForm } from './utils';

const CompanyServicesForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceDuration: '',
  });
  const { serviceName, serviceDescription, servicePrice, serviceDuration } = form;
  const [hasErrors, setHasErrors] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string } | undefined>(undefined);

  const { mutate, error } = useMutation({
    mutationFn: async () => {
      await api.post('/company/addService', {
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration,
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['services', 'getEventsFormOptions'] });
    },
    onError: (error) => {
      console.log('Error adding service', error);
    },
  });

  const handleFormChange = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const errors = validateServiceForm({
      serviceName,
      serviceDescription,
      servicePrice,
      serviceDuration,
    });
    setFormErrors(errors);
    setHasErrors(errors ? Object.keys(errors).length > 0 : false);
  }, [serviceName, serviceDescription, servicePrice, serviceDuration]);

  return (
    <KeyboardAvoidingContainer>
      <FormTitle title={t('form.addService')} onClose={onClose} />
      <Divider style={styles.divider} />
      <TextInput
        mode="outlined"
        value={serviceName}
        onChangeText={handleFormChange('serviceName')}
        label={t('form.serviceName')}
        placeholder={t('form.serviceNamePlaceholder')}
        style={styles.input}
        error={!!formErrors?.serviceName}
      />
      {formErrors?.serviceName && <Text style={styles.errorText}>{formErrors.serviceName}</Text>}
      <TextInput
        placeholder={t('form.serviceDescriptionPlaceholder')}
        mode="outlined"
        value={serviceDescription}
        onChangeText={handleFormChange('servicePrice')}
        label={t('form.serviceDescription')}
        style={styles.input}
        multiline
        error={!!formErrors?.serviceDescription}
      />
      {formErrors?.serviceDescription && (
        <Text style={styles.errorText}>{formErrors.serviceDescription}</Text>
      )}

      <TextInput
        label={t('form.servicePrice')}
        mode="outlined"
        value={servicePrice}
        onChangeText={handleFormChange('servicePrice')}
        placeholder={t('form.servicePricePlaceholder')}
        keyboardType="numbers-and-punctuation"
        style={styles.input}
        error={!!formErrors?.servicePrice}
      />
      {formErrors?.servicePrice && <Text style={styles.errorText}>{formErrors.servicePrice}</Text>}
      <TextInput
        mode="outlined"
        value={serviceDuration}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, serviceDuration: text }));
        }}
        label={t('form.serviceDuration')}
        placeholder={t('form.serviceDurationPlaceholder')}
        keyboardType="numeric"
        style={styles.input}
        error={!!formErrors?.serviceDuration}
      />
      <Text style={styles.helperText}>{t('form.serviceDurationHelper')}</Text>
      {formErrors?.serviceDuration && (
        <Text style={styles.errorText}>{formErrors.serviceDuration}</Text>
      )}

      <Button
        disabled={hasErrors}
        mode="contained"
        onPress={() => mutate()}
        style={[styles.submitButton, hasErrors && styles.buttonReadOnly]}
      >
        {t('form.save')}
      </Button>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  buttonReadOnly: {
    backgroundColor: '#cdcdcd',
  },
  errorText: {
    fontSize: 12,
    marginBottom: 10,
    color: '#f00',
  },
  helperText: {
    fontSize: 12,
    marginBottom: 10,
    color: '#666',
  },
});

export default CompanyServicesForm;
