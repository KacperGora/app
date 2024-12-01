import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const ButtonC = ({ label, onPress }: { label: string; onPress: () => void }) => {
  return <Button onPress={onPress}>{label}</Button>
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
})

export default ButtonC
