import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const Loader = () => {
  const drop1 = useRef(new Animated.Value(0)).current
  const drop2 = useRef(new Animated.Value(0)).current
  const drop3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value | Animated.ValueXY, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: -30,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      )
    }

    const animation1 = createAnimation(drop1, 0)
    const animation2 = createAnimation(drop2, 250)
    const animation3 = createAnimation(drop3, 500)

    animation1.start()
    animation2.start()
    animation3.start()
  }, [drop1, drop2, drop3])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.drop, styles.drop1, { transform: [{ translateY: drop1 }] }]} />
      <Animated.View style={[styles.drop, styles.drop2, { transform: [{ translateY: drop2 }] }]} />
      <Animated.View style={[styles.drop, styles.drop3, { transform: [{ translateY: drop3 }] }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  drop: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  drop1: {
    backgroundColor: '#2b3a67', // Color for the first drop
  },
  drop2: {
    backgroundColor: '#ff6347', // Color for the second drop
  },
  drop3: {
    backgroundColor: '#32cd32', // Color for the third drop
  },
})

export default Loader
