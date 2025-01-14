import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { TextInput, Button, Text, Divider } from 'react-native-paper'
import { debounce } from 'lodash'
import { get15stepValue, validateServiceForm } from './utils'
import api from '@helpers/api'
import { useMutation } from '@tanstack/react-query'

const CompanyServicesForm = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceDuration: '',
  })
  const { serviceName, serviceDescription, servicePrice, serviceDuration } = form

  const [hasErrors, setHasErrors] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string } | undefined>(undefined)

  const handleServiceDurationChange = useCallback(
    debounce((text) => {
      const value = get15stepValue(text)
      setForm((prev) => ({ ...prev, serviceDuration: value }))
    }, 300),
    [],
  )

  const { mutate, error } = useMutation({
    mutationFn: async () => {
      await api.post('/company/addService', {
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration,
      })
    },
    onSuccess: (data) => {
      console.log('Service added', data)
    },
    onError: (error) => {
      console.log('Error adding service', error)
    },
  })

  const handleFormChange = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    const errors = validateServiceForm({ serviceName, serviceDescription, servicePrice, serviceDuration })
    setFormErrors(errors)
    setHasErrors(errors ? Object.keys(errors).length > 0 : false)
  }, [serviceName, serviceDescription, servicePrice, serviceDuration])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text variant='titleLarge' style={styles.title}>
          {t('company.addNewService')}
        </Text>
        <Divider style={styles.divider} />

        <TextInput
          mode='outlined'
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
          mode='outlined'
          value={serviceDescription}
          onChangeText={handleFormChange('servicePrice')}
          label={t('form.serviceDescription')}
          style={styles.input}
          multiline
          error={!!formErrors?.serviceDescription}
        />
        {formErrors?.serviceDescription && <Text style={styles.errorText}>{formErrors.serviceDescription}</Text>}

        <TextInput
          label={t('form.servicePrice')}
          mode='outlined'
          value={servicePrice}
          onChangeText={handleFormChange('servicePrice')}
          placeholder={t('form.servicePricePlaceholder')}
          keyboardType='numbers-and-punctuation'
          style={styles.input}
          error={!!formErrors?.servicePrice}
        />
        {formErrors?.servicePrice && <Text style={styles.errorText}>{formErrors.servicePrice}</Text>}
        <TextInput
          mode='outlined'
          value={serviceDuration}
          onChangeText={(text) => {
            setForm((prev) => ({ ...prev, serviceDuration: text }))
            handleServiceDurationChange(text)
          }}
          label={t('form.serviceDuration')}
          placeholder={t('form.serviceDurationPlaceholder')}
          keyboardType='numeric'
          style={styles.input}
          error={!!formErrors?.serviceDuration}
        />
        <Text style={styles.helperText}>{t('form.serviceDurationHelper')}</Text>
        {formErrors?.serviceDuration && <Text style={styles.errorText}>{formErrors.serviceDuration}</Text>}

        <Button
          disabled={hasErrors}
          mode='contained'
          onPress={() => mutate()}
          style={[styles.submitButton, hasErrors && styles.buttonReadOnly]}
        >
          {t('form.save')}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  scrollView: {
    padding: 20,
  },
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
})

export default CompanyServicesForm
