import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { Button as ButtonComponent, Text } from 'react-native-paper';

import { StyleProp, ViewStyle } from 'react-native';
type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({ label, onPress, style, labelStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
  content: {
    justifyContent: 'flex-start',
  },
});

export default Button;
