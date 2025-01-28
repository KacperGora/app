import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMutation } from '@tanstack/react-query';
import { styles } from './styles';
import { Loader, PasswordStrength } from '@components';
import { api, apiRoutes } from '@helpers';
import { InputChangeHandler, RegisterForm } from './types';

const {
  auth: { register },
} = apiRoutes;

const Register = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<RegisterForm>({ username: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { username, password, confirmPassword } = form;

  const isReadOnlySubmitButton = Boolean(password !== confirmPassword || !password || !confirmPassword || errorMessage || !username);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormChange: InputChangeHandler = (key) => (value) => {
    setForm({ ...form, [key]: value });
    setErrorMessage('');
  };

  const { mutateAsync, status } = useMutation({
    mutationFn: async () => await api.post(register, { username, password }),
    onSuccess: ({ data }) => {
      alert('Registered successfully');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleRegister = async () => {
    await mutateAsync();
  };

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Title style={styles.title}>{t('global.signUp')}</Title>
          <TextInput
            label={t('form.username')}
            value={username}
            onChangeText={handleFormChange('username')}
            style={styles.input}
            mode='outlined'
          />
          <View>
            <TextInput
              label={t('form.password')}
              value={password}
              onChangeText={handleFormChange('password')}
              secureTextEntry={!showPassword}
              style={styles.input}
              mode='outlined'
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Icon size={16} name='eye' />
            </TouchableOpacity>
          </View>
          <TextInput
            label={t('form.confirmPassword')}
            value={confirmPassword}
            onChangeText={handleFormChange('confirmPassword')}
            secureTextEntry
            style={styles.input}
            mode='outlined'
          />
          {errorMessage ? <Text>{errorMessage}</Text> : <PasswordStrength password={password} passwordConfirmation={confirmPassword} />}
          <Button
            mode='contained'
            onPress={handleRegister}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            disabled={isReadOnlySubmitButton}
            theme={{ roundness: 8, mode: 'adaptive' }}
          >
            {t('global.signUp')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
