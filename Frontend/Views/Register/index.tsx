import React, { useState } from 'react';

import { Alert, Text, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { api, apiRoutes, isRequestActive, SCREEN_NAME_CONFIG } from '@helpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from 'helpers/notification';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from 'Views/Login/types';

import { styles } from './styles';
import { InputChangeHandler, RegisterForm } from './types';

const { Login } = SCREEN_NAME_CONFIG;

const RegisterScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { showNotification } = useNotification();

  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { mutateAsync, status } = useMutation<void, { code: string }>({
    mutationFn: async () => {
      const { username, password } = form;
      await api.post(apiRoutes.auth.register, { username, password });
      showNotification(t('register.success'), 'success');
      navigate({ name: Login, params: '' });
    },
    onError: (error) => {
      showNotification(error.code, 'error');
    },
  });

  const handleInputChange: InputChangeHandler = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <KeyboardAvoidingContainer>
      <Text style={styles.header}>{t('global.signUp')}</Text>
      <Input
        value={form.username}
        placeholder={t('form.username')}
        onChangeText={handleInputChange('username')}
      />
      <Input
        isPassword
        placeholder={t('form.password')}
        value={form.password}
        onChangeText={handleInputChange('password')}
      />
      <Input
        placeholder={t('form.confirmPassword')}
        value={form.confirmPassword}
        onChangeText={handleInputChange('confirmPassword')}
      />
      <Button
        label={t('global.signUp')}
        onPress={() => mutateAsync()}
        isDisabled={
          isRequestActive(status) || !form.username || !form.password || !form.confirmPassword
        }
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
      />
      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>{t('register.haveAnAccount')}</Text>
        <Button
          mode="text"
          label={t('global.signIn')}
          onPress={() => navigate({ name: Login, params: '' })}
          labelStyle={styles.boldLinkText}
        />
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default RegisterScreen;
