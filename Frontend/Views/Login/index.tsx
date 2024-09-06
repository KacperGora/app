import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, AuthContextType } from '../../context/AuthContext' // Corrected import path
import api from '../../helpers/api'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, Button } from 'react-native-paper'

interface LoginForm {
  username: string
  password: string
}
const LoginScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext) as AuthContextType

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: '',
  })

  const { username, password } = loginForm

  const handleInputChange = (key: keyof LoginForm) => (value: string) => {
    setLoginForm({ ...loginForm, [key]: value })
  }

  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      const response = await api.post('auth/login', { username, password })
      const { token } = response.data
      await AsyncStorage.setItem('token', token)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium'>Login</Text>
      <TextInput mode='outlined' label='Username' value={username} onChangeText={handleInputChange('username')} style={styles.input} />
      <TextInput
        mode='outlined'
        label='Password'
        value={password}
        onChangeText={handleInputChange('password')}
        secureTextEntry
        style={styles.input}
      />
      <Button mode='contained' onPress={handleLogin}>
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
})

export default LoginScreen
