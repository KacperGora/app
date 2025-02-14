import React from 'react';

import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { Employee } from '../../../types/companyTypes';

const EmployeeItem: React.FC<Employee> = ({ name, position, contact, imageSrc }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.itemContainer}>
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Image source={imageSrc} style={styles.image} />
        <View style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
          <Pressable onPress={() => Linking.openURL(`tel:${contact}`)}>
            <MaterialCommunityIcons name="phone" size={24} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`sms:${contact}`)}>
            <MaterialCommunityIcons name="message-text-outline" size={24} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{t('company.position', { position: position })}</Text>
    </View>
  );
};

export default EmployeeItem;

const styles = StyleSheet.create({
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
});
