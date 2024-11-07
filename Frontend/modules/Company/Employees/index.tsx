import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, FlatList, StyleSheet, Pressable, Linking, Image, ImageSourcePropType } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const employees = [
  {
    id: '1',
    name: 'Kacper',
    position: 'Stylista paznokci',
    experience: '5 years',
    contact: '786236948',
    imageSrc: require('../../../assets/images/avatar.jpg'),
  },
  {
    id: '2',
    name: 'Justyna',
    position: 'Stylistka paznokci',
    experience: '3 years',
    contact: '123123123',
    imageSrc: require('../../../assets/images/avatar2.jpg'),
  },
  {
    id: '3',
    name: 'Blania',
    position: 'Stylistka mani/pedi',
    experience: '7 years',
    contact: '123123123',
    imageSrc: require('../../../assets/images/avatar3.jpg'),
  },
]

type Employee = {
  id: string
  name: string
  position: string
  experience: string
  contact: string
  imageSrc: ImageSourcePropType
}

const EmployeeItem: React.FC<Employee> = ({ name, position, experience, contact, imageSrc }) => {
  const { t } = useTranslation()
  console.log(imageSrc)

  return (
    <View style={styles.itemContainer}>
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Image source={imageSrc} style={styles.image} />
        <View style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
          <Pressable onPress={() => Linking.openURL(`tel:${contact}`)}>
            <MaterialCommunityIcons name='phone' size={24} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`sms:${contact}`)}>
            <MaterialCommunityIcons name='message-text-outline' size={24} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{t('company.position', { position: position })}</Text>
    </View>
  )
}

const Employees = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmployeeItem
            imageSrc={item.imageSrc}
            id={item.id}
            name={item.name}
            position={item.position}
            experience={item.experience}
            contact={item.contact}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    color: '#666',
  },
  experience: {
    fontSize: 14,
    color: '#888',
  },
  contact: {
    fontSize: 14,
    color: '#888',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 25,
    shadowColor: '#000',
    shadowRadius: 1,
    elevation: 3,
    shadowOffset: {
      width: 4,
      height: 2,
    },
  },
})

export default Employees
