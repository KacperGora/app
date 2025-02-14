import React, { useState } from 'react';

import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

import { beautyTheme, borderRadius } from '@theme';
import { Button as ButtonComponent, Text } from 'react-native-paper';

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  isDisabled?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  style,
  labelStyle,
  loading,
  isDisabled,
  mode = 'contained',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      disabled={loading || isDisabled}
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
        loading && styles.buttonLoading,
      ]}
    >
      <ButtonComponent
        mode={mode}
        loading={loading}
        disabled={loading || isDisabled}
        style={[
          styles.button,
          loading && styles.buttonLoadingComponent,
          isDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[labelStyle, isDisabled && styles.buttonLabelDisabled]}>{label}</Text>
      </ButtonComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: borderRadius.medium,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonLoading: {
    opacity: 0.75,
  },
  buttonLoadingComponent: {
    borderRadius: borderRadius.medium,
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: beautyTheme.colors.onSurfaceDisabled,
    borderRadius: borderRadius.medium,
    width: '100%',
  },
  buttonLabelDisabled: {
    opacity: 0.5,
    color: beautyTheme.colors.white,
  },
});

export default Button;
