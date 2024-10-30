import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from 'react-native'
import { TextInput, Text, Button, Title } from 'react-native-paper'
import api from '../../../helpers/api'
import { useQuery } from 'react-query'
import { Customer } from '../../Customers/CustomerDetailListRow'
import { fromDateString } from '../../../helpers/toString'
import { DEFAULT_DATE_FORMAT_WITH_TIME } from '../../../helpers/constants'
import TextInputWithCounter from '../../../components/TextInputWithCounter'
import DatePicker from '../../../components/DatePicker'
import Loader from '../../../components/Loader'
import { colors } from '../../../theme/theme'

const width = Dimensions.get('window').width

type EventForm = {
  start: string
  end: string
  clientId: string
  service: string
  notes?: string
}

type CreateEventFormProps = {
  onEventCreateRequest: () => void
  initialState?: EventForm
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onEventCreateRequest, initialState }) => {
  const { t } = useTranslation()
  const [form, setForm] = useState<EventForm>({
    start: initialState?.start || '',
    end: initialState?.end || '',
    clientId: initialState?.clientId || '',
    notes: initialState?.notes || '',
    service: initialState?.service || 'Manicure klasyczny',
  })
  const [clientSearch, setClientSearch] = useState('')
  const [filteredClients, setFilteredClients] = useState<Customer[]>([])
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)

  const fetchUserList = async () => {
    const { data } = await api.get('/client/getClient')
    console.log(data)
    return data
  }

  const { data: clientList = [], isLoading } = useQuery<Customer[]>('clientList', fetchUserList)
  const handleChange = (name: keyof EventForm, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleClientSearch = (text: string) => {
    setClientSearch(text)
    const filtered: Customer[] = clientList.filter((client: Customer) => client.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredClients(filtered)
  }

  const handleClientSelect = (client: Customer) => {
    setForm((prev) => ({ ...prev, clientId: client.id }))
    setClientSearch(client.name)
    setFilteredClients([])
  }

  const handleSubmit = async () => {
    console.log(form.clientId)
    await api.post('/event/create', form)
    onEventCreateRequest()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={clientSearch}
              onChangeText={handleClientSearch}
              mode='outlined'
              label={t('form.selectClient')}
              placeholder={t('form.typeToSearch')}
            />
            {filteredClients.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredClients.map((client) => (
                  <TouchableOpacity key={client.id} onPress={() => handleClientSelect(client)} style={styles.suggestion}>
                    <Text style={styles.element}>{`${client.name} ${client.lastName}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TextInput
              style={styles.input}
              label={t('calendar.service')}
              value={form.service}
              onChangeText={(value) => handleChange('service', value)}
              mode='outlined'
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
    backgroundColor: 'white',
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
