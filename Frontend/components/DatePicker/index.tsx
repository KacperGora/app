import { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Input from 'components/TextInputWithCounter';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text, TextInput } from 'react-native-paper';
import { beautyTheme, colors } from 'theme/theme';

import {
  DATE_FORMAT_DATE_DDD_MM_YYYY_HH_MM,
  DEFAULT_DATE_FORMAT_WITH_TIME,
} from '../../helpers/constants';
import { fromDateString } from '../../helpers/toString';

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

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <View style={styles.dateTimeContainer}>
      {showDatePicker ? (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <DateTimePicker
            value={dayjs(date).toDate()}
            mode="datetime"
            onChange={handleChange}
            locale="pl"
            minuteInterval={15}
            minimumDate={minDate ? dayjs(minDate).toDate() : undefined}
          />
          <Button
            style={{
              backgroundColor: beautyTheme.colors.onBackground,
              borderRadius: beautyTheme.shape.borderRadius,
            }}
            onPress={onSaveBtnPress}
          >
            <Text style={{ color: colors.white }}>{t('form.save')}</Text>
          </Button>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleDatePicker}>
          <Text style={styles.dateTimeContainer}>
            {fromDateString({
              string: date?.toString(),
              format: DATE_FORMAT_DATE_DDD_MM_YYYY_HH_MM,
            })}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default DatePicker;
const styles = StyleSheet.create({
  dateTimeContainer: {
    marginBottom: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
