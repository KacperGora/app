import React, { useState } from 'react';

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme/theme';

const { width } = Dimensions.get('window');

type ItemFunction = () => React.ReactNode;

interface CarouselProps {
  data: ItemFunction[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={2}
        contentContainerStyle={{
          width: width * data.length,
          gap: 24,
          marginHorizontal: 1,
          overflow: 'hidden',
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={[styles.carouselItem, { width }]}>
            {item()}
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10,
    padding: 10,
    backgroundColor: colors.background,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: colors.textPrimary,
  },
  inactiveDot: {
    backgroundColor: colors.accent,
  },
});

export default Carousel;
