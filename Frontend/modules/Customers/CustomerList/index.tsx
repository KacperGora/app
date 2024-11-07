import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import CustomerDetailListRow, { Customer } from '../CustomerDetailListRow'
import api from '@helpers/api'
import { useModal } from '@helpers/hooks'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet'
import { colors } from '../../../theme/theme'
import { Searchbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

const fetchClientList = async () => {
  const { data } = await api.get('/client/getClient')
  console.log(data);
  console.log('success');
  return data
}

const CustomerList = () => {
  const { t } = useTranslation()

  const [serachQuery, setSearchQuery] = useState('')
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [clients, setClients] = useState<Customer[]>([])

  const searchHandler = useCallback((value: string) => {
    setSearchQuery(value)
    setClients(clients.filter((client) => client.name.includes(value)))
  }, [])

  const navigateToCustomerDetail = (customer: Customer) => {
    console.log('Navigate to customer detail', customer)
  }

  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity onPress={() => navigateToCustomerDetail(item)}>
      <CustomerDetailListRow customer={item} />
    </TouchableOpacity>
  )
  
  useEffect(() => {
    console.log('fetching clients')
    fetchClientList().then((data) => {
      setClients(data)
    })
  }, [])
  
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
