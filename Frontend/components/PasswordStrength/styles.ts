import { StyleSheet } from 'react-native';

import { beautyTheme, borderRadius, colors } from '@theme';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  progressBar: {
    height: 12,
    borderRadius: borderRadius.small,
  },
  passwordStrengthText: {
    fontSize: beautyTheme.fontSizes.medium,
    marginBottom: 4,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  passwordStrengthValue: {
    fontSize: beautyTheme.fontSizes.regular,
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
});
