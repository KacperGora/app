import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ServiceType } from '@types';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from 'theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { api, formatDuration, formatPrice } from '@helpers';
import { QueryObserverResult, useQueryClient } from '@tanstack/react-query';

const RightAction: React.FC<{
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  close: () => void;
  serviceId: string;
  refetchFn: () => Promise<QueryObserverResult<ServiceType[], Error>>;
}> = ({ prog, drag, close, serviceId, refetchFn }) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  const queryClient = useQueryClient();

  const deleteSerivceHandler = async () => {
    await api.post('/company/deleteService', { id: serviceId });
    await queryClient.invalidateQueries({ queryKey: ['services', 'getEventsFormOptions'] });
    await refetchFn();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity onPress={deleteSerivceHandler} style={styles.rightAction}>
        <MaterialCommunityIcons name='delete' size={32} />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

type ServiceItemProps = ServiceType & { refetchFn: () => Promise<QueryObserverResult<ServiceType[], Error>> };

const ServiceItem: React.FC<ServiceItemProps> = ({ duration, name, price, description, id, refetchFn }) => {
  const swipeableRef = useRef<any>(null);

  const closeSwipeable = () => {
    swipeableRef.current?.close();
  };
  const memoizedPrice = useMemo(() => formatPrice(price), [price]);
  const memoizedDuration = useMemo(() => formatDuration(duration), [duration]);

  return (
    <Swipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      renderRightActions={(prog, drag) => (
        <RightAction prog={prog} drag={drag} close={closeSwipeable} serviceId={id} refetchFn={refetchFn} />
      )}
    >
      <View style={styles.container}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.priceText}>{memoizedPrice}</Text>
          <Text style={styles.durationText}>{memoizedDuration}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  descriptionText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388e3c',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0288d1',
  },

  swipeable: {
    flex: 1,
  },
  rightAction: {
    flex: 1,
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
