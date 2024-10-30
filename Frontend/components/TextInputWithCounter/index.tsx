import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
interface TextInputWithCounterProps {
  placeholder: string
  value: string | undefined
  onChangeText: (text: string) => void
  maxLength: number
  multiline?: boolean
  style?: object
}

const TextInputWithCounter: React.FC<TextInputWithCounterProps> = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  multiline = false,
  style = {},
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        // placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        label={placeholder}
        textAlignVertical='top'
        multiline={multiline}
        mode='outlined'
        style={[styles.input, style]}
      />
      {Boolean(value?.length) && (
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

export default TextInputWithCounter
