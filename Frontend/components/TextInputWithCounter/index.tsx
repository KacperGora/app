import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { HelperText, TextInput as PaperInput } from 'react-native-paper';
import { beautyTheme } from 'theme/theme';

import { TextInputWithCounterProps } from './type';

const {
  colors: { secondary, white, onPrimaryContainer, outline },
} = beautyTheme;

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
  errorMessage,
  isPassword = false,
}) => {
  const [isSecureText, setIsSecureText] = useState(isPassword);

  const toggleSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  return (
    <View style={[style]}>
      <PaperInput
        style={styles.input}
        label={label}
        error={Boolean(errorMessage)}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={(v) => onBlur(v.nativeEvent.text)}
        maxLength={maxLength}
        multiline={multiline}
        keyboardType={keyboardType}
        mode="outlined"
        secureTextEntry={isSecureText}
        right={
          isPassword ? (
            <PaperInput.Icon
              icon={isSecureText ? 'eye-off' : 'eye'}
              onPress={toggleSecureText}
              size={20}
              color={secondary}
            />
          ) : undefined
        }
      />
      {Boolean(value?.length && maxLength) && (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      )}
      {errorMessage && (
        <HelperText type="error" visible>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 50,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: white,
    color: onPrimaryContainer,
    borderColor: outline,
  },
  counter: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
});

export default Input;
