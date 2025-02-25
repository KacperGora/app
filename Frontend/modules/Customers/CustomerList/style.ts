import { StyleSheet } from 'react-native';

import { beautyTheme } from '@theme';

export const styles = StyleSheet.create({
  searchBar: {
    borderRadius: beautyTheme.shape.borderRadius,
    paddingHorizontal: beautyTheme.spacing.m,
    shadowColor: beautyTheme.colors.elevation.level2,
    backgroundColor: beautyTheme.colors.primaryContainer,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'center',
  },
  animatedContainer: {
    overflow: 'hidden',
    backgroundColor: 'yellow',
  },
  inputStyle: {
    color: beautyTheme.colors.onPrimaryContainer,
    fontSize: beautyTheme.fontSizes.medium,
    paddingVertical: 0,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    gap: 30,
    marginVertical: beautyTheme.spacing.m,
  },
});
