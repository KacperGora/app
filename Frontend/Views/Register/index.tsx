import React, { useState } from 'react';

import { Alert, Text, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { api, apiRoutes } from '@helpers';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';
import { InputChangeHandler, RegisterForm } from './types';

const RegisterScreen = () => {
  const { t } = useTranslation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await api.post(apiRoutes.auth.register, form);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleRegister = async () => {
    const { username, password, confirmPassword } = form;
    const formIsValid = username && password && confirmPassword && confirmPassword === password;
    if (formIsValid) {
      await mutateAsync();
    } else {
      Alert.alert('Error', t('register.formError'));
    }
  };

  const handleInputChange: InputChangeHandler = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <KeyboardAvoidingContainer>
      <ScreenWrapper style={styles.formContainer}>
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
          onPress={handleRegister}
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
        />
        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>{t('register.haveAnAccount')}</Text>
          <Button label={t('global.signIn')} onPress={() => {}} labelStyle={styles.boldLinkText} />
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingContainer>
  );
};

export default RegisterScreen;
