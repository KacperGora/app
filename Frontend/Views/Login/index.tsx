import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { Ionicons } from '@expo/vector-icons';
import { api, apiRoutes, useAuth } from '@helpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';
import { LoginForm, LoginSuccess, RootStackParamList } from './types';
import { loginSuccessHandler } from './utils';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { setIsLoggedIn, setUserId } = useAuth();
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { mutateAsync: handleLogin } = useMutation({
    mutationFn: async () => await api.post(apiRoutes.auth.login, form),
    onSuccess: async ({ data }: { data: LoginSuccess }) => {
      await loginSuccessHandler(data, setIsLoggedIn, setUserId);
    },
    onError: (error) => {},
  });

  const handleFormChange = (name: keyof LoginForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {}, []);
  const handlePasswordVisibility = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  return (
    <KeyboardAvoidingContainer>
      <ScreenWrapper style={styles.container}>
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
        />
        <View style={styles.linksContainer}>
          <Button
            label={t('login.forgetPassword')}
            onPress={() => navigate({ name: 'RemindPassword', params: '' })}
            labelStyle={styles.linkText}
          />
          <Button
            label={t('login.dontHaveAccount')}
            onPress={() => navigate({ name: 'Register', params: '' })}
            labelStyle={styles.linkText}
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
      </ScreenWrapper>
    </KeyboardAvoidingContainer>
  );
};

export default LoginScreen;
