import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'
import axios from 'axios'
import { z } from 'zod'
import { registerSchema } from './schema'
import { globalStyles } from '../../styles'
import { useTranslation } from 'react-i18next'
import api from '../../helpers/api'

type RegisterForm = {
  username: string
  password: string
  confirmPassword: string
}

type handleChange = (key: keyof RegisterForm) => (value: string) => void

const Register = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState<RegisterForm>({ username: '', password: '', confirmPassword: '' })
  const { username, password, confirmPassword } = form

  const handleFormChange: handleChange = (key) => (value) => {
    setForm({ ...form, [key]: value })
  }

  const handleRegister = async () => {
    const validationResult = registerSchema.safeParse({ username, password, confirmPassword })
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => err.message).join('\n')
      alert(errorMessages)
      return
    }

    try {
      const response = await api.post('auth/register', { username, password })
      alert('Registered successfully')
    } catch (error: any) {
      alert(error.response.data)
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{t('global.signUp')}</Title>
      <TextInput
        label={t('global.username')}
        value={username}
        onChangeText={handleFormChange('username')}
        style={styles.input}
        mode='outlined'
      />
      <TextInput
        label={t('global.password')}
        value={password}
        onChangeText={handleFormChange('password')}
        secureTextEntry
        style={styles.input}
        mode='outlined'
      />
      <TextInput
        label={t('global.confirmPassword')}
        value={confirmPassword}
        onChangeText={handleFormChange('confirmPassword')}
        secureTextEntry
        style={styles.input}
        mode='outlined'
      />
      <Button
        mode='contained'
        onPress={handleRegister}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        {t('global.signUp')}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Lato-Bold',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Register
