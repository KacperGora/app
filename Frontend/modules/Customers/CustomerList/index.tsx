import React, { useState } from 'react'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import CustomerDetailListRow from '../CustomerDetailListRow'
import { Searchbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

export type Customer = {
  id: string
  name: string
  lastName: string
  phoneNumber: string
  notes?: string
}

type ListProps = {
  clients: Customer[]
}
const CustomerList: React.FC<ListProps> = ({ clients }) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const searchHandler = (value: string) => {
    setSearchQuery(value)
  }

  const renderItem = ({ item }: { item: Customer }) => {
    return <CustomerDetailListRow customer={item} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder={t('global.search')}
        mode='view'
        style={{ backgroundColor: '#fff' }}
        value={searchQuery}
        onChangeText={searchHandler}
        onClearIconPress={() => setSearchQuery('')}
      />
      <FlatList data={clients} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </SafeAreaView>
  )
}

export default CustomerList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
