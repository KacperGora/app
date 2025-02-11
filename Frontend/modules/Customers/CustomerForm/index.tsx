import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import TextInputWithCounter from '../../../components/TextInputWithCounter';
import { colors } from '../../../theme/theme';
import { customerFieldsConfig, initialCustomerFormValues } from './utils';
import { Client, CustomerComponentProps } from './type';
import { apiRoutes, api, useKeyboardStatus } from '@helpers';
import { Button, Input } from '@components';
import FormTitle from 'components/FormTitle';

const CustomerForm: React.FC<CustomerComponentProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();

  const [clientForm, setClientForm] = useState<Client>(initialCustomerFormValues);
  const [error, setError] = useState('');
  const [containerHeight, setContainerHeight] = useState(0);

  const handleChange = (key: keyof Client) => (value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value }));
  };
  const onClientSave = async (client: Client) => {
    try {
      await api.post(apiRoutes.client.addClient.path, client);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setClientForm(initialCustomerFormValues);
    }
  };

  const handleSubmit = async () => {
    const { name: firstName, lastName, phoneNumber, notes } = clientForm;
    await onClientSave({ name: firstName, lastName, phoneNumber, notes });
    onSubmit();
  };

  return (
    <>
      <FormTitle title={t('client.addCustomer')} onClose={onClose} />
      <View style={styles.formWrapper}>
        {customerFieldsConfig.map(({ placeholder, value, key, keyboardType }) => (
          <Input
            key={key}
            style={styles.input}
            placeholder={t(placeholder)}
            value={clientForm[value as keyof Client]}
            onChangeText={handleChange(key as keyof Client)}
            keyboardType={keyboardType || 'default'}
          />
        ))}
        <TextInputWithCounter
          maxLength={500}
          onChangeText={handleChange('notes')}
          placeholder={t('form.notes')}
          value={clientForm.notes || ''}
          multiline
          style={styles.textArea}
        />
        <Button label={t('form.save')} onPress={handleSubmit} style={styles.button} labelStyle={styles.buttonLabel} />
        <Button label={t('form.goBack')} onPress={handleSubmit} style={styles.goBackButton} labelStyle={styles.goBackBtnLabel} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.black,
    color: colors.white,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: colors.white,
  },
  goBackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackBtnLabel: {
    color: colors.black,
  },
  formWrapper: {
    gap: 16,
  },
});

export default CustomerForm;
