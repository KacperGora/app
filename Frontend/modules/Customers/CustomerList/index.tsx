import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import api from '../../../helpers/api'
import CustomerDetailListRow, { Customer } from '../CustomerDetailListRow'
import { useModal } from '../../../helpers/hooks'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../../theme/theme'
import { Chip, RadioButton, Searchbar } from 'react-native-paper'
import { Switch } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

const fetchClientList = async () => {
  const { data } = await api.get('/client/getClient')
  return data
}

const CustomerList = () => {
  const { t } = useTranslation()
  const [isFormVisible, toggleForm] = useModal()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [serachQuery, setSearchQuery] = useState('')
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [clients, setClients] = useState<Customer[]>([])

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const searchHandler = useCallback((value: string) => {
    setSearchQuery(value)
    setClients(clients.filter((client) => client.name.includes(value)))
  }, [])

  const navigateToCustomerDetail = (customer: Customer) => {
    console.log('Navigate to customer detail', customer)
  }

  useEffect(() => {
    console.log('fetching clients');
    fetchClientList().then((data) => {
      setClients(data)
    })
  }, [])
  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity onPress={() => navigateToCustomerDetail(item)}>
      <CustomerDetailListRow customer={item} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder={t('global.search')}
        mode='view'
        style={{ backgroundColor: '#fff' }}
        value={serachQuery}
        onChangeText={searchHandler}
        onClearIconPress={() => setSearchQuery('')}
      />
      <FlatList data={clients} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </SafeAreaView>
  )
}

export default CustomerList
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
})
