import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { Ionicons } from '@expo/vector-icons';
import { api, apiRoutes, isRequestActive, useAuth } from '@helpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from 'helpers/notification';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';
import { LoginForm, LoginSuccess, RootStackParamList } from './types';
import { loginApiHandler, loginSuccessHandler, validateLogin } from './utils';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const { setIsLoggedIn, setUserId } = useAuth();
  const { showNotification } = useNotification();

  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutateAsync: handleLogin, status } = useMutation<LoginSuccess, { code: string }>({
    mutationFn: async () => await loginApiHandler(form),
    onSuccess: async (data: LoginSuccess) => {
      await loginSuccessHandler(data, setIsLoggedIn, setUserId);
    },
    onError: (err) => {
      setForm({ username: '', password: '' });
      showNotification(t(`error.${err.code}`), 'error');
    },
  });

  const handleFormChange = (name: keyof LoginForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setIsFormValid(validateLogin(form).success);
  }, [form]);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingContainer>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Appoitment</Text>
        </View>
        <Text style={styles.header}>{t('global.welcomeBack')}</Text>
        <Input
          placeholder={t('global.login')}
          value={form.username}
          onChangeText={handleFormChange('username')}
        />
        <Input
          placeholder={t('login.password')}
          value={form.password}
          onChangeText={handleFormChange('password')}
          isPassword
        />
        <Button
          label={t('global.signIn')}
          onPress={handleLogin}
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
          loading={isRequestActive(status)}
          isDisabled={!isFormValid}
        />
        <View style={styles.linksContainer}>
          <Button
            label={t('login.forgetPassword')}
            onPress={() => navigate({ name: 'RemindPassword', params: '' })}
            labelStyle={styles.linkText}
            mode="text"
          />
          <Button
            label={t('login.dontHaveAccount')}
            onPress={() => navigate({ name: 'Register', params: '' })}
            labelStyle={styles.linkText}
            mode="text"
          />
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingContainer>
    </ScreenWrapper>
  );
};

export default LoginScreen;
