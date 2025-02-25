import { StyleSheet } from 'react-native';

import { beautyTheme } from 'theme/theme';

const {
  colors: { primary, onPrimaryContainer, white, onTertiary, background },
  fontSizes: { regular, xlarge, medium },
  fontWeight: { semi },
} = beautyTheme;

export const styles = StyleSheet.create({
  header: {
    fontSize: xlarge,
    fontWeight: semi,
    marginBottom: 20,
    textAlign: 'center',
    color: onPrimaryContainer,
  },
  registerButton: {
    backgroundColor: primary,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: white,
    fontSize: regular,
    fontWeight: semi,
  },
  linksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: onTertiary,
    fontSize: medium,
  },
  boldLinkText: {
    fontWeight: semi,
    color: primary,
    marginLeft: 4,
  },
});
