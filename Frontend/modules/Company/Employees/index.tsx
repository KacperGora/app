import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import EmployeeItem from '../EmployeeItem';

const employees = [
  {
    id: '1',
    name: 'Kacper',
    position: 'Stylista paznokci',
    contact: '786236948',
    imageSrc: require('../../../assets/images/avatar.jpg'),
  },
  {
    id: '2',
    name: 'Justyna',
    position: 'Stylistka paznokci',
    contact: '123123123',
    imageSrc: require('../../../assets/images/avatar2.jpg'),
  },
  {
    id: '3',
    name: 'Blania',
    position: 'Stylistka mani/pedi',
    contact: '123123123',
    imageSrc: require('../../../assets/images/avatar3.jpg'),
  },
];

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
            contact={item.contact}
          />
        )}
      />
    </View>
  );
};

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
});

export default Employees;
