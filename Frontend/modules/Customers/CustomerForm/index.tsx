import React, { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer } from '@components';
import { api, apiRoutes } from '@helpers';
import FormTitle from 'components/FormTitle';
import { useTranslation } from 'react-i18next';

import TextInputWithCounter from '../../../components/TextInputWithCounter';
import { colors } from '../../../theme/theme';
import { Client, CustomerComponentProps } from './type';
import { customerFieldsConfig, initialCustomerFormValues } from './utils';

const CustomerForm: React.FC<CustomerComponentProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();

  const [clientForm, setClientForm] = useState<Client>(initialCustomerFormValues);

  const handleChange = (key: keyof Client) => (value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value }));
  };

  const onClientSave = async (client: Client) => {
    try {
      await api.post(apiRoutes.client.addClient.path, client);
    } catch (error: any) {
      // setError(error.message);
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
            value={clientForm[value as keyof Client] || ''}
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
        <Button
          label={t('form.save')}
          onPress={handleSubmit}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />

        <Button
          label={t('form.goBack')}
          onPress={handleSubmit}
          mode="outlined"
          // style={styles.goBackButton}
          // labelStyle={styles.goBackBtnLabel}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
    width: '100%',
  },
  buttonLabel: {
    color: colors.white,
    width: '100%',
    textAlign: 'center',
  },
  goBackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
