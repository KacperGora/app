import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-paper';
interface TextInputWithCounterProps {
  placeholder: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
  label?: string;
  maxLength?: number;
  multiline?: boolean;
  style?: object;
  onBlur?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<TextInputWithCounterProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur = () => {},
  maxLength,
  multiline = false,
  style = {},
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={(v) => onBlur(v.nativeEvent.text)}
        maxLength={maxLength}
        label={label}
        placeholder={placeholder}
        textAlignVertical='top'
        textContentType='addressCity'
        multiline={multiline}
        mode='outlined'
        style={[styles.input, style]}
        keyboardType={keyboardType}
      />
      {Boolean(value?.length && maxLength) && (
        <Text style={styles.counter}>
          {value?.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
  },
  counter: {
    textAlign: 'right',
    marginTop: 5,
    color: '#888',
    fontSize: 12,
    position: 'absolute',
    right: 12,
    bottom: 24,
  },
});

export default Input;
