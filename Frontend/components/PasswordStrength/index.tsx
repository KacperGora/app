import React from 'react';

import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { beautyTheme, colors } from 'theme/theme';

import { styles } from './styles';
import { getPasswordMessage, getPasswordStrength, strengthColors, strengthLabels } from './utils';

type PasswordStrengthProps = {
  password: string;
  passwordConfirmation: string;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, passwordConfirmation }) => {
  const { t } = useTranslation();
  const strength = getPasswordStrength(password);
  const passwordMessage = getPasswordMessage(password, passwordConfirmation);
  const progress = strength / strengthLabels.length;
  const strengthColor = strengthColors[strength - 1] || beautyTheme.colors.error;

  return (
    <View style={styles.container}>
      <View style={styles.passwordTextContainer}>
        <Text style={styles.passwordStrengthText}>{t('form.passwordStrength')}</Text>
        {Boolean(password.length) && (
          <Text style={styles.passwordStrengthValue}>
            {t(strengthLabels[strength - 1]) || t('form.weak')}
          </Text>
        )}
      </View>
      <ProgressBar progress={progress} color={strengthColor} style={styles.progressBar} />
      <View style={styles.passwordValidationMessage}>
        <Icon name="information-outline" size={20} color={colors.textPrimary} />
        <Text style={{ color: colors.textPrimary }}>{t(passwordMessage)}</Text>
      </View>
    </View>
  );
};

export default PasswordStrength;
