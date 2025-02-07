import React, { useState } from 'react';

import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Button, KeyboardAvoidingContainer } from '@components';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from 'components/ScreenWrapper';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

const RemindPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRemindPassword = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    if (!email.includes('@')) {
      setError(t('remindPassword.invalidEmail'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://your-backend-api.com/remind-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(t('remindPassword.error'));
      }

      setSuccessMessage(t('remindPassword.emailSent'));
    } catch (err) {
      setError(t('remindPassword.error'));
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingContainer>
      <ScreenWrapper style={styles.formContainer}>
        <Text style={styles.header}>{t('remindPassword.title')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('remindPassword.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        ></TextInput>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
        <Button
          mode="contained"
          label={t('remindPassword.send')}
          onPress={handleRemindPassword}
          loading={isLoading}
          style={styles.button}
        />
      </ScreenWrapper>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#6C4A5B',
    borderWidth: 1,
    borderColor: '#E0D1D6',
  },
  button: {
    // backgroundColor: '#D18E9D',
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RemindPassword;
