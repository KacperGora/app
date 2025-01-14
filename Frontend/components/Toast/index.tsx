import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'react-native-paper'

interface ToastProps {
  message: string
  duration?: number
  onClose?: () => void
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true)
  const opacity = useRef(new Animated.Value(0)).current
  const theme = useTheme()

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false)
        if (onClose) {
          onClose()
        }
      })
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose, opacity])

  if (!visible) return null

  return (
    <Animated.View style={[styles.toast, { opacity, backgroundColor: theme.colors.surface }]}>
      <Text style={{ color: theme.colors.onSurface }}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
})

export default Toast
