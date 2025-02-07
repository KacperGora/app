import { StyleSheet } from 'react-native';

import { beautyTheme } from '@theme';

const {
  colors: { primary, onPrimaryContainer, white, secondary },
  fontSizes: { large, xlarge, medium: fontMediumSize },
  fontWeight: { semi },
} = beautyTheme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 40,
    fontWeight: semi,
    color: primary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingInline: 20,
  },
  header: {
    fontSize: xlarge,
    fontWeight: semi,
    marginBottom: 20,
    textAlign: 'center',
    color: onPrimaryContainer,
  },
  loginButton: {
    backgroundColor: primary,
    width: '100%',
    marginBottom: 20,
  },
  loginButtonText: {
    color: white,
    fontSize: large,
    fontWeight: semi,
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: primary,
    fontSize: fontMediumSize,
    marginVertical: 5,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: secondary,
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
