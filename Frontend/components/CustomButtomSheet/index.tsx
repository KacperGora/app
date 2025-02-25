import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { beautyTheme } from '@theme';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');
const SNAP_POINTS = [WINDOW_HEIGHT * 0.2, WINDOW_HEIGHT * 0.8] as const;
const ANIMATION_CONFIG = {
  spring: { tension: 68, friction: 12, useNativeDriver: true },
  timing: { duration: 300, useNativeDriver: true },
};

interface CustomBottomSheetPropsType {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  minimizedContent?: React.ReactNode;
  snapPoints?: readonly number[];
  onCurrentIndexChange?: (index: number) => void;
}

const CustomBottomSheet: React.FC<CustomBottomSheetPropsType> = ({
  isVisible,
  onClose,
  children,
  minimizedContent,
  snapPoints,
  onCurrentIndexChange,
}) => {
  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  const bottomSheetSnapPoints = snapPoints || SNAP_POINTS;

  const snapTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= bottomSheetSnapPoints.length) return;
      setCurrentSnapIndex(index);
      onCurrentIndexChange && onCurrentIndexChange(index || 0);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      Animated.spring(translateY, {
        toValue: bottomSheetSnapPoints[index],
        ...ANIMATION_CONFIG.spring,
      }).start();
    },
    [translateY, bottomSheetSnapPoints],
  );

  const closeSheet = useCallback(() => {
    Animated.timing(translateY, {
      toValue: WINDOW_HEIGHT,
      ...ANIMATION_CONFIG.timing,
    }).start(() => {
      setCurrentSnapIndex(0);
      onCurrentIndexChange && onCurrentIndexChange(0);
    });
  }, [translateY, onClose]);

  useEffect(() => {
    if (isVisible) {
      snapTo(0);
    } else {
      closeSheet();
    }
  }, [isVisible, snapTo, closeSheet]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => {
        if (isScrolling.current) return false;
        return Math.abs(dy) > 5;
      },
      onPanResponderMove: (_, { dy }) => {
        const newTranslateY = bottomSheetSnapPoints[currentSnapIndex] + dy;
        if (newTranslateY >= bottomSheetSnapPoints[0] && newTranslateY <= WINDOW_HEIGHT) {
          translateY.setValue(newTranslateY);
        } else if (newTranslateY < bottomSheetSnapPoints[0]) {
          translateY.setValue(bottomSheetSnapPoints[0]);
        } else {
          translateY.setValue(WINDOW_HEIGHT);
        }
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -50 && currentSnapIndex < bottomSheetSnapPoints.length - 1) {
          snapTo(currentSnapIndex + 1);
        } else if (dy > 50 && currentSnapIndex > 0) {
          snapTo(currentSnapIndex - 1);
        } else {
          snapTo(currentSnapIndex);
        }
      },
    }),
  ).current;

  const handleScrollBeginDrag = useCallback(() => {
    isScrolling.current = true;
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    isScrolling.current = false;
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor:
            currentSnapIndex === 1
              ? beautyTheme.colors.inversePrimary
              : beautyTheme.colors.background,
          transform: [{ translateY }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.handleContainer]}>
        <View
          style={[
            styles.handle,
            currentSnapIndex === 1 && {
              backgroundColor: '#fff',
              shadowColor: beautyTheme.colors.onBackground,
              shadowOffset: { height: 2, width: 4 },
              shadowOpacity: 0.5,
            },
          ]}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 100, android: 80 })}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
        >
          {currentSnapIndex === 1 && minimizedContent ? minimizedContent : children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: WINDOW_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  handleContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: beautyTheme.colors.onBackground,
    borderRadius: 5,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 60,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default CustomBottomSheet;
