import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import api from '@helpers/api'
import { fromIntervalToMinutes } from '@helpers/transformers'

import TextInputWithCounter from '@components/TextInputWithCounter'
import DatePicker from '@components/DatePicker'
import Loader from '@components/Loader'
import Input from '@components/TextInputWithCounter'
import Button from '@components/Button'

import { Service } from '@modules/Company/CompanyServices'
import { Customer } from '@modules/Customers/CustomerList'
import { getFullName } from '@helpers/utils'
import { isEventDurationLongerThanADay, initialFormState } from './utils'
import { apiRoutes } from '@helpers/apiRoutes'
import { styles } from './style'
import { EventForm, EventFormOptionType } from './type'
import SearchWithList from '@components/SearchWithList'
import CustomerForm from '@modules/Customers/CustomerForm'

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
      const { data } = await api.get(apiRoutes.getEventOptions)
      return data
    },
  })

  const [form, setForm] = useState<EventForm>({
    start: initialState?.start || initialFormState.start,
    end: initialState?.end || initialFormState.end,
    clientId: initialState?.clientId || initialFormState.clientId,
    notes: initialState?.notes || initialFormState.notes,
    service: initialState?.service || initialFormState.service,
  })

  const [search, setSearch] = useState({ clientsSearch: '', servicesSearch: '' })
  const [filteredOptions, setFilteredOptions] = useState<{ clients: Customer[]; services: Service[] }>({ clients: [], services: [] })
  const [isClientFormVisible, setIsClientFormVisible] = useState(false)

  const { clients, services } = filteredOptions

  const isAddClientOptionVisible =
    clients && !clients.some((client) => client.name === search.clientsSearch) && Boolean(search.clientsSearch.length)

  const toggleAddClientForm = () => {
    setIsClientFormVisible((prev) => !prev)
  }
  console.log(isClientFormVisible)

  const handleChange = (name: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleOptionSearch = (listName: 'services' | 'clients') => (text: string) => {
    setSearch((prev) => ({ ...prev, [`${listName}Search`]: text }))
    const list = data?.[listName] || []
    const filtered = list.filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
    setFilteredOptions((prev) => ({ ...prev, [listName]: filtered }))
  }

  const handleClientSelect = (client: Customer) => {
    const { id: clientId, name, lastName } = client
    setForm((prev) => ({ ...prev, clientId }))
    setSearch((prev) => ({ ...prev, clientsSearch: getFullName(name, lastName) }))
    setFilteredOptions((prev) => ({ ...prev, clients: [] }))
  }

  const handleServiceSelect = (service: Service) => {
    const durationMinutes = fromIntervalToMinutes(service.duration)
    const startDate = dayjs(form.start)
    if (startDate.isValid()) {
      const end = startDate.add(durationMinutes, 'minutes').toISOString()
      setForm((prev) => ({ ...prev, service: service.name, end }))
    } else {
      throw new Error('Invalid date')
    }
    setForm((prev) => ({ ...prev, price: service.price }))
    setSearch((prev) => ({ ...prev, servicesSearch: service.name }))
    setFilteredOptions((prev) => ({ ...prev, services: [] }))
  }

  const handleClientFormSubmit = async () => {
    toggleAddClientForm()
  }

  const handleSubmit = async () => {
    try {
      await api.post(apiRoutes.createEvent, form)
      await onEventCreateRequest()
    } catch (error) {
      console.log(error)
    } finally {
      setForm(initialFormState)
      setSearch({ clientsSearch: '', servicesSearch: '' })
    }
  }

  const handleSelect = (name: EventFormOptionType) => (item: Service | Customer) => {
    if (name === 'service') {
      handleServiceSelect(item as Service)
    } else {
      handleClientSelect(item as Customer)
    }
  }

  const renderItem = (name: EventFormOptionType) => (item: Service | Customer) => {
    const nameValue = name === 'service' ? (item as Service).name : getFullName((item as Customer).name, (item as Customer).lastName)
    return (
      <TouchableOpacity key={item.id} onPress={() => handleSelect(name)(item)} style={styles.suggestion}>
        <Text style={styles.element}>{nameValue}</Text>
      </TouchableOpacity>
    )
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
    if (isEventDurationLongerThanADay(form.start, form.end)) {
      setForm((prev) => ({ ...prev, end: form.start }))
    }
  }, [form.start, form.end])

  if (isClientFormVisible) {
    return <CustomerForm onSubmit={handleClientFormSubmit} />
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
        {isLoading || !data ? (
          <Loader />
        ) : (
          <>
            <SearchWithList
              label={t('form.selectClient')}
              placeholder={t('form.typeToSearch')}
              list={clients}
              renderItem={renderItem('customer')}
              searchValue={search.clientsSearch}
              handleInputChange={handleOptionSearch('clients')}
            />
            {isAddClientOptionVisible && <Button label={t('form.addClient')} onPress={toggleAddClientForm} style={styles.suggestion} />}
            <SearchWithList
              label={t('form.selectService')}
              placeholder={t('form.typeToSearch')}
              list={services}
              renderItem={renderItem('service')}
              searchValue={search.servicesSearch}
              handleInputChange={handleOptionSearch('services')}
            />
            <Input
              keyboardType='numeric'
              placeholder={t('form.price')}
              onChangeText={(v) => handleChange('price', v)}
              style={styles.input}
              value={form.price?.toString()}
              label={t('form.price')}
            />
            <DatePicker
              label={t('calendar.startDate')}
              value={form.start}
              onChange={(startDate) => handleChange('start', startDate)}
              minDate={dayjs().toISOString()}
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
            <Button label={t('form.save')} style={styles.submitButton} onPress={handleSubmit} labelStyle={styles.btnLabel} />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateEventForm
