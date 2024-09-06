import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules, Platform } from 'react-native'

import { pl } from './pl.js'
import { en } from './en.js'

import { Module, ModuleType, LanguageDetectorModule } from 'i18next'

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    let detectedLanguage: string | undefined

    AsyncStorage.getItem('user-language')
      .then((language) => {
        if (language) {
          detectedLanguage = language
        }
      })
      .catch((err) => {
        console.error('Error fetching language from AsyncStorage:', err)
      })

    if (!detectedLanguage) {
      const locale =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier

      detectedLanguage = locale ? locale.split('_')[0] : 'pl'
    }

    return detectedLanguage
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('user-language', language).catch((err) => {
      console.error('Error saving language to AsyncStorage:', err)
    })
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      pl,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
