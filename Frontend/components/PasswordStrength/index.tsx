import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { getPasswordMessage, getPasswordStrength, strengthColors, strengthLabels } from './utils'
import { colors } from 'theme/theme'

const PasswordStrength = ({ password, passwordConfirmation }: { password: string; passwordConfirmation: string }) => {
  const { t } = useTranslation()
  const strength = getPasswordStrength(password)
  const passwordMessage = getPasswordMessage(password, passwordConfirmation)
  const progress = strength / strengthLabels.length
  const strengthColor = strengthColors[strength - 1] || '#ff0000'

  return (
    <View style={styles.container}>
      <View style={styles.passwordTextContainer}>
        <Text style={styles.passwordStrengthText}>{t('form.passwordStrength')}</Text>
        {Boolean(password.length) && <Text style={styles.passwordStrengthValue}>{t(strengthLabels[strength - 1]) || t('form.weak')}</Text>}
      </View>
      <ProgressBar progress={progress} color={strengthColor} style={styles.progressBar} />
      <View style={styles.passwordValidationMessage}>
        <Icon name='information-outline' size={20} color={colors.textPrimary} />
        <Text style={{ color: colors.textPrimary }}>{t(passwordMessage)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  passwordStrengthText: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  passwordStrengthValue: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  passwordTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordValidationMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
})

export default PasswordStrength
