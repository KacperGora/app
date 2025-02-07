import React, { useRef, useState } from 'react';

import { Keyboard, TouchableOpacity, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetFormWrapper } from '@components';
import { api, apiRoutes, useAuth } from '@helpers';
import { CustomerDetail, CustomerForm, CustomerList, Statistics } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';
import { ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '@theme';
import { drawerScreenOptions } from './utils';

const {
  client: { getList },
} = apiRoutes;
type ToggleEnum = 'day' | 'week' | 'month';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HeaderRight = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="plus" size={24} color={colors.textPrimary} style={{ marginRight: 15 }} />
  </TouchableOpacity>
);

const CustomerListWithDrawer = () => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [toggle, setToggle] = useState<ToggleEnum>('day');
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const { data: clients = [], refetch } = useQuery<CustomerType[]>({
    queryKey: [getList.queryKey],
    queryFn: async () => {
      const { data } = await api.get(getList.path);
      return data;
    },
  });

  const handleFormToggle = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.expand();
  };

  const handleFormClose = async () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.close();
    await refetch();
  };

  return (
    <>
      <Drawer.Navigator
        initialRouteName="CustomerListDrawer"
        screenOptions={{ ...drawerScreenOptions, drawerType: 'front' }}
      >
        <Drawer.Screen
          name="CustomerListDrawer"
          options={{
            title: t('navigation.clientsBase'),
            headerRight: () => <HeaderRight onPress={handleFormToggle} />,
          }}
        >
          {() => <CustomerList clients={clients} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="CustomerDetailDrawer"
          options={{
            title: t('navigation.statistics'),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                <ToggleButton
                  icon="calendar-month"
                  value="month"
                  status={toggle === 'month' ? 'checked' : 'unchecked'}
                  onPress={() => setToggle('month')}
                />
                <ToggleButton
                  icon="calendar-today"
                  value="day"
                  status={toggle === 'day' ? 'checked' : 'unchecked'}
                  onPress={() => setToggle('day')}
                />
              </View>
            ),
          }}
        >
          {() => <Statistics />}
        </Drawer.Screen>
      </Drawer.Navigator>
      <BottomSheetFormWrapper ref={bottomSheetRef}>
        <CustomerForm onSubmit={handleFormClose} />
      </BottomSheetFormWrapper>
    </>
  );
};

const Customers = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerList"
        component={CustomerListWithDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          title: t('navigation.clientDetails'),
          headerTintColor: 'black',
          headerBackTitle: 'Wróć',
        }}
      />
    </Stack.Navigator>
  );
};

export default Customers;
