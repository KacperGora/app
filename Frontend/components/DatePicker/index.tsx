import { useTranslation } from 'react-i18next'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { fromDateString } from '../../helpers/toString'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DEFAULT_DATE_FORMAT_WITH_TIME } from '../../helpers/constants'
import { StyleSheet, View } from 'react-native'

type DatePickerProps = {
  label: string
  value: string
  onChange: (value: string) => void
  minDate?: string
}
const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, minDate }) => {
  const { t } = useTranslation()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(value)

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev)
  }
  const handleChange = (event: DateTimePickerEvent, value: Date | undefined) => {
    setDate(value ? value.toISOString() : '')
  }
  const onSaveBtnPress = () => {
    setShowDatePicker(false)
    onChange(date)
  }
  const customTheme = {
    colors: {
      background: 'white',
    },
  }
  return (
    <View style={styles.dateTimeContainer}>
      {showDatePicker ? (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <DateTimePicker
            value={date ? new Date(date) : new Date()}
            mode='datetime'
            onChange={handleChange}
            locale='pl'
            minuteInterval={15}
            minimumDate={minDate ? new Date(minDate) : undefined}
          />
          <Button onPress={onSaveBtnPress}>{t('form.save')}</Button>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            label={label}
            mode='outlined'
            value={fromDateString({ string: date.toString(), format: DEFAULT_DATE_FORMAT_WITH_TIME })}
            theme={customTheme}
            style={{ pointerEvents: 'none' }}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default DatePicker
const styles = StyleSheet.create({
  dateTimeContainer: {
    marginBottom: 16,
  },
})
