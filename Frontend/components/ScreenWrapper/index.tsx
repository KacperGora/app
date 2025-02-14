import React, { ReactNode } from 'react';

import { SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from 'react-native-paper';

const ScreenWrapper: React.FC<{ children: ReactNode; style?: StyleProp<ViewStyle> }> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default ScreenWrapper;
