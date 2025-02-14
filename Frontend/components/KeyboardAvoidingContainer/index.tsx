import React, { ReactNode } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { beautyTheme } from '@theme';
import ScreenWrapper from 'components/ScreenWrapper';
import { useTheme } from 'react-native-paper';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const KeyboardAvoidingContainer = ({ children, style }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.contentContainer, style]}
        >
          <ScreenWrapper style={styles.screenWrapper}>{children}</ScreenWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 50 : 0,
  },
  screenWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
