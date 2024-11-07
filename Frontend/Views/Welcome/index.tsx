import * as React from 'react'
import { View, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import { Button, Text, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import api from '@helpers/api'

export type RootStackParamList = {
  navigate(arg0: string): void
  Login: undefined
  Register: undefined
}

const WelcomeScreen = () => {
  const navigation = useNavigation<RootStackParamList>()
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('global.welcome')}</Text>
          <Button mode='contained' onPress={() => navigation.navigate('Login')} style={styles.button}>
            {t('global.login')}
          </Button>
          <Button mode='outlined' onPress={() => navigation.navigate('Register')}>
            {t('global.signUp')}
          </Button>
        </View>
      </View>
      <Image source={require('../../assets/images/splash.png')} style={styles.background} />
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    objectFit: 'scale-down',
    zIndex: -1,
    left: 0,
    position: 'absolute',
    bottom: 0,
    maxWidth: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '80%',
    height: '30%',
    margin: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2b3a67',
  },
  button: {
    width: '80%',
    backgroundColor: '#2b3a67',
  },
})

export default WelcomeScreen
