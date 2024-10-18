import React, { useRef } from 'react'
import { View, StyleSheet, Animated, PanResponder, Button } from 'react-native'

interface BottomSheetProps {
  children: React.ReactNode
}

const BottomSheet = React.forwardRef(({ children }: BottomSheetProps, ref) => {
  const translateY = useRef(new Animated.Value(300)).current
  const maxHeight = 300

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(Math.max(0, gestureState.dy))
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeSheet()
        } else {
          openSheet()
        }
      },
    }),
  ).current

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const closeSheet = () => {
    Animated.spring(translateY, {
      toValue: maxHeight,
      useNativeDriver: true,
    }).start()
  }

  React.useImperativeHandle(ref, () => ({
    openSheet,
    closeSheet,
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
        <View style={styles.sheetHandle} />
        {children}
        <Button title='Close' onPress={closeSheet} />
      </Animated.View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
})

export default BottomSheet
