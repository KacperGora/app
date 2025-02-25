import React, { useState } from 'react';

import { Text, View } from 'react-native';

import { Button, Input, KeyboardAvoidingContainer, ScreenWrapper } from '@components';
import { isRequestActive, SCREEN_NAME_CONFIG } from '@helpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from 'helpers/notification';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from 'Views/Login/types';

import { styles } from './styles';
import { InputChangeHandler, RegisterForm } from './types';
import { registerApiHandler, validateRegistration } from './utils';

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

  const [isFormValid, setIsFormValid] = useState(false);

  const { mutateAsync, status } = useMutation<void, { code: string }, RegisterForm>({
    mutationFn: (form: RegisterForm) => {
      const validForm = validateRegistration(form);
      if (validForm.success) {
        showNotification(t('register.success'), 'success');
        navigate({ name: Login, params: '' });
        return registerApiHandler(form);
      } else {
        showNotification(validForm.error.message, 'error');
        return Promise.reject({ code: validForm.error.errors[0].message });
      }
    },
    onError: (err) => {
      showNotification(t(`error.${err.code}`), 'error');
    },
  });

  const handleInputChange: InputChangeHandler = (key) => (value) => {
    setForm((prev) => {
      const newForm = { ...prev, [key]: value };
      setIsFormValid(validateRegistration(newForm).success);
      return newForm;
    });
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingContainer>
        <Text style={styles.header}>{t('global.signUp')}</Text>
        <Input
          value={form.username}
          placeholder={t('form.username')}
          onChangeText={handleInputChange('username')}
          keyboardType="default"
        />
        <Input
          isPassword
          placeholder={t('form.password')}
          value={form.password}
          onChangeText={handleInputChange('password')}
        />
        <Input
          isPassword
          placeholder={t('form.confirmPassword')}
          value={form.confirmPassword}
          onChangeText={handleInputChange('confirmPassword')}
        />
        <Button
          label={t('global.signUp')}
          onPress={() => mutateAsync(form)}
          loading={isRequestActive(status)}
          isDisabled={!isFormValid}
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
    </ScreenWrapper>
  );
};

export default RegisterScreen;
