import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import api from '@helpers/api'
import ServiceItem from '../ServicesItem'
import { Searchbar } from 'react-native-paper'

export type Service = {
  id: string
  name: string
  description?: string
  price: number
  duration: { hours?: number; minutes: number }
}

const fetchServices = async (payload: { sortOrder: string; sortBy: string; search?: string }) => {
  const { data } = await api.get('/company/getServices', {
    params: payload,
  })
  return data
}

type PayloadType = {
  sortOrder: 'ASC' | 'DESC'
  sortBy: keyof Service
  search?: string
}

const CompanyServices = () => {
  const [payload, setPayload] = useState<PayloadType>({
    sortOrder: 'ASC',
    sortBy: 'name',
    search: '',
  })

  const { data } = useQuery<Service[]>({
    queryKey: ['services', payload],
    queryFn: () => fetchServices(payload),
    enabled: !!payload,
  })

  const handleFiltersChange = useCallback(
    debounce((search: string) => {
      setPayload((prev) => ({ ...prev, search }))
    }, 500),
    [],
  )

  return (
    <View>
      <View>
        <Searchbar value={payload.search as string} onChangeText={(text) => setPayload((prev) => ({ ...prev, search: text }))} />
        <FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ServiceItem {...item} />} />
      </View>
    </View>
  )
}

export default CompanyServices
