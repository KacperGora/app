import { Dimensions, Platform, StyleSheet } from 'react-native';

import { beautyTheme } from '@theme';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: WINDOW_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  handleContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: beautyTheme.colors.onBackground,
    borderRadius: 5,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 80,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
