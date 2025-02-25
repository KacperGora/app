import React, { useState } from 'react';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

import { styles } from './styles';

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
    <KeyboardAvoidingContainer style={{ justifyContent: 'center', flex: 1, gap: 20, padding: 20 }}>
      <Text style={styles.header}>{t('remindPassword.title')}</Text>
      <Input
        placeholder={t('remindPassword.emailPlaceholder')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <Button
        label={t('global.send')}
        onPress={handleRemindPassword}
        loading={isLoading}
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabel}
        mode="contained"
      />
    </KeyboardAvoidingContainer>
  );
};

export default RemindPassword;
