import React, { useState, useEffect } from 'react'
import { StyleSheet, Animated, Dimensions, View, Text } from 'react-native'
import { Snackbar } from 'react-native-paper'

interface ToastProps {
  visible: boolean
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'top' | 'bottom'
}

const Notification: React.FC<ToastProps> = ({ visible, message, type = 'info', duration = 3000, position = 'top' }) => {
  const [show, setShow] = useState(visible)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').width))

  const positionStyle = position === 'top' ? { top: 160 } : { bottom: 50 }

  useEffect(() => {
    if (visible) {
      setShow(true)

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start()

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: Dimensions.get('window').width,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => setShow(false))
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [visible, duration, fadeAnim, slideAnim])

  return (
    <Animated.View style={[styles.toast, positionStyle, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
      {show && (
        <Snackbar
          visible={visible}
          onDismiss={() => setShow(false)}
          duration={duration}
          style={[styles.snackbar, positionStyle, styles[type]]}
        >
          <Text style={styles.message}>{message}</Text>
        </Snackbar>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%',
    elevation: 5,
  },
  snackbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.5,
    alignItems: 'center',
  },
  message: {
    color: 'white',
  },
  success: {
    backgroundColor: 'green',
  },
  warning: {
    backgroundColor: '#ff9800',
  },
  error: {
    backgroundColor: 'red',
  },
  info: {
    backgroundColor: 'black',
  },
})

export default Notification
