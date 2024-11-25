import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '@helpers/api'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, AuthContextType } from 'context/AuthContext'
import { Customer } from '@modules/Customers/CustomerDetailListRow'

type Form = {
  username: string
  password: string
}

export type RootStackParamList = {
  Register: string
  CustomerDetail: { customer: Customer }
}

const LoginScreen = () => {
  const { setIsLoggedIn, setLogin, setUserId } = useContext(AuthContext) as AuthContextType

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const { t } = useTranslation()

  const [form, setForm] = useState<Form>({ username: '', password: '' })
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev)
  }

  const handleFormChange = (name: keyof Form) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/login', form)
      return data
    },
    onSuccess: (data) => {
      AsyncStorage.setItem('token', data.token)
      AsyncStorage.setItem('refreshToken', data.refresh_token)
      setLogin(data.user.username)
      setUserId(data.user.id)
      setIsLoggedIn(true)
    },
    onError: (error) => {
      console.error('Login failed', error)
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.gradient}>
          <Text style={styles.appName}>Appointment</Text>
          <Text style={styles.tagline}>Zarządzaj biznesem w prosty sposób</Text>
        </View>
      </View>
      <View style={styles.wave}></View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form}>
          <TextInput
            label='Nazwa użytkownika'
            mode='outlined'
            style={styles.input}
            keyboardType='email-address'
            onChangeText={handleFormChange('username')}
          />
          <TextInput
            label='Hasło'
            mode='outlined'
            style={styles.input}
            onChangeText={handleFormChange('password')}
            secureTextEntry={!passwordVisible}
          />
          <Button mode='contained' onPress={() => mutate()} style={styles.button}>
            Zaloguj
          </Button>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={{ textAlign: 'right', color: '#ff9a9e' }}>Pokaż hasło</Text>
          </TouchableOpacity>
          <Button onPress={() => navigate({ name: 'Register', params: '' })} uppercase={false} style={styles.signupButton}>
            {t('login.dontHaveAccount')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    position: 'relative',
    height: 80,
  },
  gradient: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9a9e',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    elevation: 1,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    fontWeight: '500',
    fontFamily: 'Lato-B',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    height: '60%',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
  signupButton: {
    marginTop: 20,
  },
})

export default LoginScreen
