import React, { ReactNode } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { beautyTheme } from '@theme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
};
const { spacing } = beautyTheme;

const KeyboardAvoidingContainer = ({ children, style, contentStyle }: Props) => {
  return (
    <KeyboardAvoidingView
      style={[styles.contentContainer, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.screenWrapper, contentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 50 : 0,
  },
  screenWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingInline: spacing.l,
    flexDirection: 'column',
    gap: spacing.l,
    flexGrow: 1,
  },
});
