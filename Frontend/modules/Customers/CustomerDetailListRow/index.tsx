import { Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { beautyTheme } from '@theme';
import { CustomerType } from '@types';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from 'Views/Login/types';

import { DEFAULT_DATE_FORMAT } from '../../../helpers/constants';
import { handlePhonePress } from './utils';

const CustomerDetailListRow: React.FC<{ customer: CustomerType }> = ({ customer }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { lastName, name, phoneNumber } = customer;
  const isContactDisplayed = Boolean(phoneNumber);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CustomerDetail', { customer })}
      style={styles.item}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.name}>{`${name} ${lastName}`}</Text>
        {isContactDisplayed && (
          <View style={styles.phoneWrapper}>
            <TouchableOpacity onPress={handlePhonePress('tel')(phoneNumber)}>
              <Icon name="phone-outline" size={24} color={beautyTheme.colors.inverseSurface} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePhonePress('sms')(phoneNumber)}>
              <Icon name="message-outline" size={24} color={beautyTheme.colors.inverseSurface} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.phone}>{phoneNumber}</Text>
      <View>
        {!customer.lastVisit && (
          <Text style={styles.visit}>
            {`Ostatnia wizyta: ${dayjs(customer.lastVisit).format(DEFAULT_DATE_FORMAT)}`}
          </Text>
        )}
        {!customer.nextVisit && (
          <Text style={styles.visit}>
            {`Następna wizyta: ${dayjs(customer.lastVisit).format(DEFAULT_DATE_FORMAT)}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomerDetailListRow;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginInline: 20,
    borderColor: beautyTheme.colors.secondary,
    borderRadius: beautyTheme.spacing.s,
    backgroundColor: beautyTheme.colors.inverseOnSurface,
    shadowColor: beautyTheme.colors.onSurfaceVariant,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontWeight: beautyTheme.fontWeight.medium,
    color: '#333',
    fontSize: beautyTheme.fontSizes.large,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  visit: {
    fontSize: 14,
    color: beautyTheme.colors.onBackground,
    fontWeight: beautyTheme.fontWeight.medium,
    marginVertical: beautyTheme.spacing.s,
  },

  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'flex-end',
  },
  leftAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  leftActionIcon: {},
});
