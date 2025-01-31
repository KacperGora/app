import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LoginForm, LoginSuccess, RootStackParamList } from './types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { api, apiRoutes, useAuth } from '@helpers';
import { loginSuccessHandler } from './utils';
import { styles } from './styles';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { setIsLoggedIn } = useAuth();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { mutateAsync: handleLogin } = useMutation({
    mutationFn: async () => await api.post(apiRoutes.auth.login, form),
    onSuccess: async ({ data }: { data: LoginSuccess }) => {
      await loginSuccessHandler(data);
      setIsLoggedIn(true);
    },
    onError: (error) => {},
  });

  const handlePasswordVisibility = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  const handleFormChange = (name: keyof LoginForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} contentContainerStyle={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Appoitment</Text>
            </View>
            <Text style={styles.header}>{t('global.welcomeBack')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('global.login')}
              placeholderTextColor='#B0A8B9'
              value={form.username}
              onChangeText={handleFormChange('username')}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder={t('login.password')}
                placeholderTextColor='#B0A8B9'
                secureTextEntry={!passwordIsVisible}
                value={form.password}
                onChangeText={handleFormChange('password')}
              />
              <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons name={passwordIsVisible ? 'eye-off' : 'eye'} size={20} color='#B0A8B9' />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLogin()} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('global.signIn')}</Text>
            </TouchableOpacity>
            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.linkText}>{t('login.forgetPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate({ name: 'Register', params: '' })}>
                <Text style={styles.linkText}>{t('login.dontHaveAccount')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name='logo-google' size={24} color='white' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name='logo-facebook' size={24} color='white' />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
