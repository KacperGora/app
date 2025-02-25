import React, { ReactNode } from 'react';

import { SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from 'react-native-paper';

const ScreenWrapper: React.FC<{ children: ReactNode; style?: StyleProp<ViewStyle> }> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ScreenWrapper;
