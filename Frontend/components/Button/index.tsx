import { borderRadius } from '@theme';
import React, { useState } from 'react';

import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

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
  mode,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      disabled={loading || isDisabled}
      style={[styles.button, style, isPressed && styles.buttonPressed]}
    >
      <ButtonComponent mode={mode} loading={loading} disabled={loading || isDisabled}>
        <Text style={labelStyle}>{label}</Text>
      </ButtonComponent>
    </TouchableOpacity>
  );
};
const { medium } = borderRadius;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: medium,
    paddingVertical: 6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

export default Button;
