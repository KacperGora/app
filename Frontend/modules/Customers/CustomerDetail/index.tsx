import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerType } from '@types';
import { useNavigation } from '@react-navigation/native';
import { apiRoutes, getFullName, api } from '@helpers';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-native-paper';
import { colors } from 'theme/theme';

type CustomerDetailProps = {
  route?: {
    params: {
      customer: CustomerType;
    };
  };
};
const CustomerDetail: React.FC<CustomerDetailProps> = ({ route = { params: { customer: {} as CustomerType } } }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { customer } = route.params || {};
  const { id: clientId, lastName, name, phoneNumber, notes } = customer;

  const deleteCustomer = useMutation({
    mutationFn: async () => {
      await api.post(apiRoutes.client.delete.path, { clientId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientList'] });
      Alert.alert(t('global.success'), t('client.deletetionSuccess'), [{ text: 'OK', onPress: () => navigation.goBack() }]);
    },
    onError: (error: any) => {
      Alert.alert(t('global.error'), `${t('client.deletionError')} ${error.message}`);
    },
  });

  // const getCustomerData = useQuery({
  //   queryKey: ['client', { clientId }],
  //   queryFn: async () => {
  //     const { data } = await api.get(apiRoutes.getClient, { clientId })
  //     return data
  //   },
  // })

  const handleDelete = () => {
    Alert.alert(
      t('global.confirmation'),
      `${t('client.deletionConfirmation')} ${customer.name}?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Usuń', onPress: () => deleteCustomer.mutate() },
      ],
      { cancelable: true },
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Card.Title title={getFullName(name, lastName)} style={{ flex: 1 }} />
        <Card.Actions>
          <Icon.Button name='delete' backgroundColor={'transparent'} iconStyle={{ color: 'red' }} onPress={handleDelete}></Icon.Button>
        </Card.Actions>
      </View>
      <Card.Content>
        <Text>{`Telefon: ${phoneNumber}`}</Text>
        <Text>{`Notatki: ${notes}`}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButtonContainer: {
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default CustomerDetail;
