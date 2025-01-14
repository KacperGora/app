import React, { useContext, useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { AuthContext, AuthContextType } from 'context/AuthContext'
import { loginApiHandler, loginSuccessHandler, validateLoginForm } from './utils'
import { styles } from './styles'
import { LoginForm, LoginSuccess, RootStackParamList } from './types'
import { name as appName } from '../../package.json'
import ButtonC from '@components/Button'

const LoginScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as AuthContextType

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const { t } = useTranslation()

  const [form, setForm] = useState<LoginForm>({ username: '', password: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev)
  }

  const handleFormChange = (name: keyof LoginForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    const validationError = validateLoginForm(form)
    if (validationError) {
      setError(validationError)
      return
    }
    await mutateAsync(form)
  }

  const { mutateAsync } = useMutation({
    mutationFn: loginApiHandler,
    onSuccess: async ({ data }: { data: LoginSuccess }) => await loginSuccessHandler(data, setIsLoggedIn),
    onError: (error) => {
      setError('Nieprawidłowe dane logowania')
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.gradient}>
          <Text style={styles.appName}>{appName}</Text>
          <Text style={styles.tagline}>Zarządzaj biznesem w prosty sposób</Text>
        </View>
      </View>
      <View style={styles.wave}></View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            label={t('login.username')}
            mode='outlined'
            style={styles.input}
            keyboardType='email-address'
            onChangeText={handleFormChange('username')}
          />
          <TextInput
            label={t('login.password')}
            mode='outlined'
            style={styles.input}
            onChangeText={handleFormChange('password')}
            secureTextEntry={!passwordVisible}
          />
          <ButtonC label={'Zaloguj'} onPress={handleLogin} />
          <ButtonC label='Pokaż hasło' onPress={togglePasswordVisibility} />
          <ButtonC label={t('login.dontHaveAccount')} onPress={() => navigate({ name: 'Register', params: '' })} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen
