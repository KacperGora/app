import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { TextInput, Button, Text, Divider } from 'react-native-paper'
import { debounce } from 'lodash'
import { get15stepValue, serviceFormSchema } from './utils'
import * as z from 'zod'
import api from '@helpers/api'

const CompanyServicesForm = () => {
  const { t } = useTranslation()
  const [serviceName, setServiceName] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceDuration, setServiceDuration] = useState('')

  const [errors, setErrors] = useState({ serviceName: '', serviceDescription: '', servicePrice: '', serviceDuration: '' })

  const handleServiceDurationChange = useCallback(
    debounce((text) => {
      setServiceDuration(get15stepValue(text))
    }, 300),
    [],
  )

  const validateForm = () => {
    const formData = {
      serviceName,
      serviceDescription,
      servicePrice,
      serviceDuration,
    }

    try {
      serviceFormSchema.parse(formData)
      setErrors({
        serviceName: '',
        serviceDescription: '',
        servicePrice: '',
        serviceDuration: '',
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {}
        err.errors.forEach(({ path, message }) => {
          errorMessages[path[0]] = message
        })
        setErrors({
          serviceName: errorMessages.serviceName || '',
          serviceDescription: errorMessages.serviceDescription || '',
          servicePrice: errorMessages.servicePrice || '',
          serviceDuration: errorMessages.serviceDuration || '',
        })
      }
    }
  }

  useEffect(() => {}, [serviceName, serviceDescription, servicePrice, serviceDuration])

  const handleSubmit = async () => {
    await api.post('/company/addService', {
      serviceName,
      serviceDescription,
      servicePrice,
      serviceDuration,
    })
  }

  const isReadOnlyButton = Object.values(errors).some((error) => Boolean(error.length))

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
          onChangeText={setServiceName}
          onBlur={validateForm}
          onFocus={() => setErrors((prev) => ({ ...prev, serviceName: '' }))}
          label={t('form.serviceName')}
          placeholder={t('form.serviceNamePlaceholder')}
          style={styles.input}
          error={!!errors.serviceName}
        />
        {errors.serviceName && <Text style={styles.errorText}>{errors.serviceName}</Text>}

        <TextInput
          placeholder={t('form.serviceDescriptionPlaceholder')}
          mode='outlined'
          value={serviceDescription}
          onChangeText={setServiceDescription}
          onBlur={validateForm}
          onFocus={() => setErrors((prev) => ({ ...prev, serviceDescription: '' }))}
          label={t('form.serviceDescription')}
          style={styles.input}
          multiline
          error={!!errors.serviceDescription}
        />
        {errors.serviceDescription && <Text style={styles.errorText}>{errors.serviceDescription}</Text>}

        <TextInput
          label={t('form.servicePrice')}
          mode='outlined'
          value={servicePrice}
          onChangeText={setServicePrice}
          onBlur={validateForm}
          onFocus={() => setErrors((prev) => ({ ...prev, servicePrice: '' }))}
          placeholder={t('form.servicePricePlaceholder')}
          keyboardType='numbers-and-punctuation'
          style={styles.input}
          error={!!errors.servicePrice}
        />
        {errors.servicePrice && <Text style={styles.errorText}>{errors.servicePrice}</Text>}

        <TextInput
          mode='outlined'
          value={serviceDuration}
          onChangeText={(text) => {
            setServiceDuration(text)
            handleServiceDurationChange(text)
          }}
          onBlur={validateForm}
          label={t('form.serviceDuration')}
          placeholder={t('form.serviceDurationPlaceholder')}
          keyboardType='numeric'
          onFocus={() => setErrors((prev) => ({ ...prev, servicePrice: '' }))}
          style={styles.input}
          error={!!errors.serviceDuration}
        />
        <Text style={styles.helperText}>{t('form.serviceDurationHelper')}</Text>
        {errors.serviceDuration && <Text style={styles.errorText}>{errors.serviceDuration}</Text>}

        <Button
          disabled={isReadOnlyButton}
          mode='contained'
          onPress={handleSubmit}
          style={[styles.submitButton, isReadOnlyButton && styles.buttonReadOnly]}
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
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  helperText: {
    fontSize: 12,
    marginBottom: 10,
    color: '#666',
  },
})

export default CompanyServicesForm
