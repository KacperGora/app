import React, { useContext, useEffect, useState } from 'react';

import { Animated, StyleSheet, Text } from 'react-native';

import { NotificationContext } from 'helpers/notification';
import { useTheme } from 'react-native-paper';

const NotificationBanner = () => {
  const context = useContext(NotificationContext);
  const { colors } = useTheme();
  const [translateX] = useState(new Animated.Value(300));
  const [opacity] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (context && context.notification) {
      setIsVisible(true);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(5000),
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      setTimeout(() => setIsVisible(false), 5800);
    }
  }, [context?.notification]);

  if (!context || !context.notification || !isVisible) return null;

  const { notification } = context;

  return (
    <Animated.View
      style={[
        styles.banner,
        { transform: [{ translateX }], opacity },
        {
          backgroundColor: notification.type === 'error' ? colors.error : colors.primary,
        },
      ]}
    >
      <Text style={styles.text}>{notification.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    width: 'auto',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationBanner;
