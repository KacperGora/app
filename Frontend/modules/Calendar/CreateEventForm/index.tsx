import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, ScrollView, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Button, Title } from 'react-native-paper'
import api from '@helpers/api'
import { useQuery } from '@tanstack/react-query'
import TextInputWithCounter from '@components/TextInputWithCounter'
import DatePicker from '@components/DatePicker'
import Loader from '@components/Loader'
import { colors } from '../../../theme/theme'
import dayjs from 'dayjs'
import Input from '@components/TextInputWithCounter'
import { fromIntervalToMinutes } from '@helpers/transformers'
import { Service } from '@modules/Company/CompanyServices'
import { Customer } from '@modules/Customers/CustomerList'

const width = Dimensions.get('window').width

type EventForm = {
  start: string
  end: string
  clientId: string
  service: string
  notes?: string
  price?: number
}

type CreateEventFormProps = {
  onEventCreateRequest: () => Promise<void>
  initialState?: EventForm
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onEventCreateRequest, initialState }) => {
  const { t } = useTranslation()

  const { data, isLoading = false } = useQuery<{
    services: Service[]
    clients: Customer[]
  }>({
    queryKey: ['getEventsFormOptions'],
    queryFn: async () => {
      const { data } = await api.get('/event/fetchEventOptions')
      console.log(data)
      return data
    },
  })
console.log(initialState)
  const [form, setForm] = useState<EventForm>({
    start: initialState?.start || '',
    end: initialState?.end || '',
    clientId: initialState?.clientId || '',
    notes: initialState?.notes || '',
    service: initialState?.service || 'Manicure klasyczny',
  })
  const [clientSearch, setClientSearch] = useState('')
  const [serviceSearch, setServiceSearch] = useState('')
  const [filteredClients, setFilteredClients] = useState<Customer[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  const handleChange = (name: keyof EventForm, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleClientSearch = (text: string) => {
    setClientSearch(text)
    const filtered: Customer[] = (data?.clients || []).filter((client: Customer) => client.name.toLowerCase().includes(text.toLowerCase()))
    // const filtered: Customer[] = clientList.filter((client: Customer) => client.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredClients(filtered)
  }

  const handleServiceSearch = (text: string) => {
    setServiceSearch(text)
    const filtered: Service[] = (data?.services || []).filter((service: Service) => service.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredServices(filtered)
  }

  const handleClientSelect = (client: Customer) => {
    setForm((prev) => ({ ...prev, clientId: client.id }))
    setClientSearch(`${client.name} ${client.lastName}`)
    setFilteredClients([])
  }

  const handleServiceSelect = (service: Service) => {
    const durationMinutes = fromIntervalToMinutes(service.duration)
    const startDate = dayjs(form.start)
    if (startDate.isValid()) {
      const end = startDate.add(durationMinutes, 'minutes').toISOString()
      setForm((prev) => ({ ...prev, service: service.name, end }))
    } else {
      console.error('Invalid start date:', form.start)
    }
    setForm((prev) => ({ ...prev, price: service.price }))
    setServiceSearch(service.name)
    setFilteredServices([])
  }

  const handleSubmit = async () => {
    console.log('form', form)
    try {
      await api.post('/event/create', form)
    } catch (error) {
      console.error('Error creating event:', error)
    }
    await onEventCreateRequest()
  }

  const handleUpdate = async () => {
    try {
      await api.patch('/event/update', form)
    } catch (error) {
      console.error('Error updating event:', error)
    }
    await onEventCreateRequest()
  }

  useEffect(() => {
    setForm(
      initialState || {
        start: '',
        end: '',
        clientId: '',
        service: '',
      },
    )
  }, [initialState])

  useEffect(() => { 
    if (initialState) {
     console.log(initialState);
    }
  }, [initialState])

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
        {isLoading || !data ? (
          <Loader />
        ) : (
          <>
            <Input
              style={styles.input}
              value={clientSearch}
              onChangeText={handleClientSearch}
              label={t('form.selectClient')}
              placeholder={t('form.typeToSearch')}
            />
            {filteredClients.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredClients.map((client) => {
                  return (
                    <TouchableOpacity key={client.id} onPress={() => handleClientSelect(client)} style={styles.suggestion}>
                      <Text style={styles.element}>{`${client.name} ${client.lastName}`}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}

            <Input
              style={styles.input}
              value={serviceSearch}
              onChangeText={handleServiceSearch}
              label={t('form.selectService')}
              placeholder={t('form.typeToSearch')}
            />
            {filteredServices.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredServices.map((client) => (
                  <TouchableOpacity key={client.id} onPress={() => handleServiceSelect(client)} style={styles.suggestion}>
                    <Text style={styles.element}>{`${client.name}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Input
              keyboardType='numeric'
              placeholder='Cena'
              onChangeText={(v) => handleChange('price', v)}
              style={styles.input}
              value={form.price?.toString()}
              label={t('form.price')}
            />
            <DatePicker
              label={t('calendar.startDate')}
              value={form.start}
              onChange={(startDate) => handleChange('start', startDate)}
              minDate={new Date().toISOString()}
            />
            <DatePicker
              label={t('calendar.endDate')}
              value={form.end}
              onChange={(endDate) => handleChange('end', endDate)}
              minDate={form.start}
            />
            <TextInputWithCounter
              maxLength={500}
              onChangeText={(value) => handleChange('notes', value)}
              placeholder={t('calendar.notes')}
              value={form?.notes}
              multiline
              style={[styles.input, styles.textArea]}
            />

            <Button mode='contained' onPress={handleSubmit} style={styles.submitButton}>
              {t('form.save')}
            </Button>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  formTitle: {
    marginBottom: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    width: width,
    backgroundColor: colors.background,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginTop: -10,
    marginBottom: 16,
    elevation: 3,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  suggestion: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  element: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input2: {
    backgroundColor: '#f0f0f0',
  },
  dateTimeContainer: {
    marginBottom: 16,
  },
  dateTimeInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 16,
  },
  dateTimeLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateTimeTextInput: {
    backgroundColor: '#fff',
  },
  dateTimePicker: {
    width: 190,
  },
  submitButton: {
    paddingVertical: 2,
    backgroundColor: 'black',
    color: 'white',
  },
  textArea: {
    height: 100,
    borderColor: 'black',
  },
})

export default CreateEventForm
