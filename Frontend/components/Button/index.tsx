import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { Button as ButtonComponent } from 'react-native-paper'

import { StyleProp, ViewStyle } from 'react-native'

const Button = ({
  label,
  onPress,
  style,
  labelStyle,
}: {
  label: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
}) => {
  return (
    <ButtonComponent mode='contained' style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </ButtonComponent>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  label: {
    color: '#000',
  },
})

export default Button
