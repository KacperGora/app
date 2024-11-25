import dayjs from 'dayjs'
import { Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_FORMAT_WITH_TIME } from '../../../helpers/constants'
import { Swipeable } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { EventForm } from '../../../Views/Calendar'
import { useNavigation } from '@react-navigation/native'

export interface Customer {
  name: string
  lastName: string
  phoneNumber: string
  lastVisit: string
  id: string
  events: EventForm[]
}

type PhoneMethod = 'tel' | 'sms'

interface Props {
  customer: Customer
}

import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../Views/Login'

const CustomerDetailListRow: React.FC<Props> = ({ customer }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { lastName, name, lastVisit, phoneNumber, events } = customer
  const isContactDisplayed = Boolean(phoneNumber)
  const handlePhonePress = (type: PhoneMethod) => () => {
    let url = `${type}:${phoneNumber}`
    if (type === 'sms') {
      url += `?body=${encodeURIComponent('Przypomnienie o wizycie w salonie dnia: ' + dayjs().format(DEFAULT_DATE_FORMAT))}`
    }
    Linking.openURL(url)
  }

  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'right') {
    }
  }
  const handleDeleteCustomer = () => {}

  const renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={handleDeleteCustomer} style={styles.leftAction}>
        <Icon name='delete-outline' size={24} color='red' style={styles.leftActionIcon} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CustomerDetail', { customer })}
      style={styles.item}
      accessibilityLabel={`Customer ${name} ${lastName}`}
    >
      <Text style={styles.name}>{`${name} ${lastName}`}</Text>
      {isContactDisplayed && (
        <View style={styles.phoneWrapper}>
          <TouchableOpacity onPress={handlePhonePress('tel')} accessibilityLabel={`Call ${name}`}>
            <Text style={styles.phone}>{phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhonePress('sms')} accessibilityLabel={`Send SMS to ${name}`}>
            <Icon name='message-outline' size={24} color='#666' />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CustomerDetailListRow

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  lastVisit: {
    fontSize: 14,
    color: '#999',
  },

  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  leftActionIcon: {},
})
