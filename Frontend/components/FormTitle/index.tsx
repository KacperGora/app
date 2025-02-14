import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const FormTitle: React.FC<{ title: string; onClose?: () => void }> = ({ title, onClose }) => {
  const displayCloseIcon = !!onClose;
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {displayCloseIcon && <Icon name="close" size={24} onPress={onClose} />}
    </View>
  );
};

export default FormTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
