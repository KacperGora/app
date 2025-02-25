import { StyleSheet } from 'react-native';

import { beautyTheme } from '@theme';

const {
  colors: { primary, onPrimaryContainer, white, secondary },
  fontSizes: { xlarge, medium: fontMediumSize },
  fontWeight: { semi },
  spacing,
} = beautyTheme;

export const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 40,
    fontWeight: semi,
    color: primary,
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingInline: spacing.l,
    flexDirection: 'column',
    gap: spacing.l,
    flexGrow: 1,
  },
  header: {
    fontSize: xlarge,
    fontWeight: semi,
    textAlign: 'center',
    color: onPrimaryContainer,
  },
  loginButton: {
    backgroundColor: primary,
    width: '100%',
  },
  loginButtonText: {
    color: white,
    fontSize: fontMediumSize,
    fontWeight: semi,
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: primary,
    fontSize: fontMediumSize,
    marginVertical: spacing.s,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: secondary,
    padding: spacing.m,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
