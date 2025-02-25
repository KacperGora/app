import { StyleSheet } from 'react-native';

import { beautyTheme, colors } from 'theme/theme';

export const styles = StyleSheet.create({
  formTitle: {
    marginBottom: beautyTheme.spacing.l,
    color: beautyTheme.colors.onBackground,
    fontSize: beautyTheme.fontSizes.xlarge,
    fontWeight: beautyTheme.fontWeight.semi,
  },
  suggestion: {
    paddingVertical: beautyTheme.spacing.m,
    borderRadius: 4,
  },
  element: {
    color: colors.textPrimary,
    fontWeight: beautyTheme.fontWeight.medium,
  },

  dateTimeContainer: {
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    borderColor: 'black',
  },
  btnLabel: {
    color: beautyTheme.colors.onBackground,
    fontWeight: beautyTheme.fontWeight.medium,
    textAlign: 'left',
    width: '100%',
  },
  submitBtnLabel: {
    textAlign: 'center',
    width: '100%',
  },
  formContainer: {
    gap: beautyTheme.spacing.l,
  },
  timeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: beautyTheme.spacing.s,
    marginBottom: beautyTheme.spacing.xl,
    backgroundColor: beautyTheme.colors.surfaceDisabled,
    borderRadius: beautyTheme.shape.borderRadius,
    padding: beautyTheme.spacing.m,
  },
  timeLabel: {
    color: beautyTheme.colors.onBackground,
    fontWeight: 'bold',
    fontSize: beautyTheme.fontSizes.medium,
  },
});
