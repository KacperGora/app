import dayjs from 'dayjs'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DEFAULT_DATE_FORMAT } from '../../../helpers/constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { Swipeable } from 'react-native-gesture-handler'

export interface Customer {
  name: string
  phone: string
  lastVisit: string
}

interface Props {
  navigation: StackNavigationProp<any>
  item: Customer
  onSwipeLeft: (customer: Customer) => void // Dodano props do obsługi akcji swipe
}

const CustomerDetailListRow: React.FC<Props> = ({ navigation, item, onSwipeLeft }) => {
  const handlePress = (customer: Customer) => {
    navigation.navigate('CustomerDetail', { customer })
  }

  const { name, phone, lastVisit } = item

  // Funkcja do renderowania zawartości po lewej stronie
  const renderLeftAction = () => {
    return (
      <View style={styles.leftAction}>
        <Text style={styles.leftActionText}>Usuń</Text>
      </View>
    )
  }

  return (
    <Swipeable renderLeftActions={renderLeftAction} onSwipeableLeftOpen={() => onSwipeLeft(item)}>
      <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
          <Text style={styles.lastVisit}>{`Ostatnia wizyta: ${dayjs(lastVisit).locale('pl').format(DEFAULT_DATE_FORMAT)}`}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
  leftAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ff3d00', // Kolor akcji
    width: 80,
    paddingHorizontal: 10,
  },
  leftActionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
