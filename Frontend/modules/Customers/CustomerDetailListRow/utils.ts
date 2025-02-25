import { Linking } from 'react-native';

import { DEFAULT_DATE_FORMAT } from '@helpers';
import dayjs from 'dayjs';

type PhoneMethod = 'tel' | 'sms';

export const handlePhonePress = (type: PhoneMethod) => (phoneNumber: string) => () => {
  let url = `${type}:${phoneNumber}`;
  if (type === 'sms') {
    url += `?body=${encodeURIComponent('Przypomnienie o wizycie w salonie dnia: ' + dayjs().format(DEFAULT_DATE_FORMAT))}`;
  }
  Linking.openURL(url);
};
