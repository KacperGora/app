import { StyleSheet } from 'react-native';

import { beautyTheme, colors } from 'theme/theme';

export const styles = StyleSheet.create({
  formTitle: {
    marginBottom: 16,
    color: beautyTheme.colors.onBackground,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'red',
  },
  suggestion: {
    paddingVertical: beautyTheme.spacing.m,
    width: 'auto',
    borderRadius: 4,
    borderBottomColor: colors.textSecondary,
    borderBottomWidth: 1,
  },
  element: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  dateTimeContainer: {
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    borderColor: 'black',
  },
  btnLabel: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  addBtn: {
    width: '100%',
  },
  formContainer: {
    gap: beautyTheme.spacing.l,
    flex: 1,
  },
});
