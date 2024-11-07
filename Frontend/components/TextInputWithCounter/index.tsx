import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardTypeOptions } from 'react-native'
import { TextInput } from 'react-native-paper'
interface TextInputWithCounterProps {
  placeholder: string
  value: string | undefined
  onChangeText: (text: string) => void
  label?: string
  maxLength?: number
  multiline?: boolean
  style?: object
  keyboardType?: KeyboardTypeOptions
}

const Input: React.FC<TextInputWithCounterProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
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
        maxLength={maxLength}
        label={placeholder}
        placeholder={placeholder}
        textAlignVertical='top'
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
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
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
})

export default Input
