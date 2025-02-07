import React, { ReactNode } from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from 'react-native-paper';

const ScreenWrapper: React.FC<{ children: ReactNode; style?: StyleProp<ViewStyle> }> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
