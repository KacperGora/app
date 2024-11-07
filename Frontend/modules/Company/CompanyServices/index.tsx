import api from '@helpers/api'
import { set } from 'lodash'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type Service = {
  serviceName: string
  serviceDescription: string
  servicePrice: number
  serviceDuration: number
}

const CompanyServices = () => {
  const [services, setServices] = useState<Service[]>([])
  
  const fetchServices = async () => {
    const { data } = await api.get('/company/getServices')
    setServices(data)
    return []
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <View>
      <Text>CompanyServices</Text>
      <View>
        <Text>{services[0].serviceName}</Text>
        <Text>{services[0].serviceDescription}</Text>
        <Text>{services[0].servicePrice}</Text>
        <Text>{services[0].serviceDuration}</Text>
      </View>
    </View>
  )
}

export default CompanyServices
