import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, SafeAreaView, Text } from 'react-native'
import CustomerDetailListRow, { Customer } from '../CustomerDetailListRow'
import { useQuery } from '@tanstack/react-query'
import api from '@helpers/api'
import { Button, Searchbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import Notification from '@components/Notification'

const fetchClientList = async () => {
  const { data } = await api.get('/client/getClient')
  console.log(data)
  return data
}

const CustomerList = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: clients,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['clientList'],
    queryFn: fetchClientList,
  })

  const searchHandler = (value: string) => {
    setSearchQuery(value)
  }

  const renderItem = ({ item }: { item: Customer }) => {
    return <CustomerDetailListRow customer={item} />
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return <Notification type='error' message='Coś poszło nie tak' visible />
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
