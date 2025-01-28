import { useTranslation } from 'react-i18next';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { fromDateString } from '../../helpers/toString';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_DATE_FORMAT_WITH_TIME } from '../../helpers/constants';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { colors } from 'theme/theme';

type DatePickerProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, minDate }) => {
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(value);
  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };
  const handleChange = (event: DateTimePickerEvent, value: Date | undefined) => {
    setDate(value ? value.toISOString() : '');
  };

  const onSaveBtnPress = () => {
    setShowDatePicker(false);
    onChange(date);
  };

  const customTheme = {
    colors: {
      background: 'white',
    },
  };

  useEffect(() => {
    setDate(value);
  }, [value]);
  
  return (
    <View style={styles.dateTimeContainer}>
      {showDatePicker ? (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <DateTimePicker
            value={dayjs(date).toDate()}
            mode='datetime'
            display='compact'
            onChange={handleChange}
            locale='pl'
            minuteInterval={15}
            minimumDate={minDate ? dayjs(minDate).toDate() : undefined}
            style={{ width: '100%' }}
          />
          <Button style={{ backgroundColor: colors.black, borderRadius: 4 }} onPress={onSaveBtnPress}>
            <Text style={{ color: colors.white }}>{t('form.save')}</Text>
          </Button>
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
  );
};
export default DatePicker;
const styles = StyleSheet.create({
  dateTimeContainer: {
    marginBottom: 16,
  },
});
