import { StyleSheet } from 'react-native';

import { beautyTheme } from '@theme';

const {
  colors: { onPrimaryContainer, white, error },
  fontSizes: { xlarge, medium: fontMediumSize },
  fontWeight: { semi },
} = beautyTheme;

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: xlarge,
    fontWeight: semi,
    color: onPrimaryContainer,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    borderRadius: 5,
    width: '100%',
  },
  buttonLabel: {
    color: white,
    fontSize: fontMediumSize,
    fontWeight: semi,
    width: '100%',
    textAlign: 'center'
  },
  errorText: {
    color: error,
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});
