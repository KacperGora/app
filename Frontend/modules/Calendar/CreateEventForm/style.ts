import { StyleSheet } from 'react-native';

import { colors } from 'theme/theme';

export const styles = StyleSheet.create({
  formTitle: {
    marginBottom: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  suggestion: {
    paddingVertical: 8,
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
  submitButton: {
    paddingVertical: 8,
    backgroundColor: 'black',
    borderRadius: 8,
    width: '100%',
  },
  textArea: {
    height: 100,
    borderColor: 'black',
  },
  btnLabel: {
    color: colors.black,
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
  },
  addBtn: {
    paddingVertical: 8,
  },
});
