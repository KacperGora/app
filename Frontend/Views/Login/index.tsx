import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, AuthContextType } from '../../context/AuthContext'
import api from '../../helpers/api'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, Button } from 'react-native-paper'

interface LoginForm {
  username: string
  password: string
}

const LoginScreen = () => {
  const { setIsLoggedIn, setLogin, setUserId } = useContext(AuthContext) as AuthContextType
  const [remindChecked, setRemindChecked] = useState(false)

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: '',
  })

  const { username, password } = loginForm

  const onCheckboxTap = () => {
    setRemindChecked((prev) => !prev)
  }
  const handleInputChange = (key: keyof LoginForm) => (value: string) => {
    setLoginForm({ ...loginForm, [key]: value })
  }

  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      console.log('loginForm:', loginForm);
      const response = await api.post('auth/login', { username, password })
      const { data } = response
      const {
        token,
        user: { login, id },
      } = data
      setLogin(login)
      setIsLoggedIn(true)
      setUserId(id)
      await AsyncStorage.multiSet([
        ['token', token],
        ['login', login],
      ])
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
