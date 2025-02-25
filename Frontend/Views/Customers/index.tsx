import React, { useRef, useState } from 'react';

import { Keyboard, TouchableOpacity, View } from 'react-native';

import { BottomSheetFormWrapper, CustomBottomSheet } from '@components';
import BottomSheet from '@gorhom/bottom-sheet';
import { api, apiRoutes, useAuth } from '@helpers';
import { CustomerDetail, CustomerForm, CustomerList, Statistics } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme, colors } from '@theme';
import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';
import { ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { drawerScreenOptions } from './utils';

const {
  client: { getList },
} = apiRoutes;
type ToggleEnum = 'day' | 'week' | 'month';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HeaderRight = ({
  onAddPress,
  onSearchPress,
}: {
  onAddPress: () => void;
  onSearchPress: () => void;
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={onSearchPress}>
      <Icon
        name="magnify"
        size={24}
        color={beautyTheme.colors.onBackground}
        style={{ marginRight: 15 }}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onAddPress}>
      <Icon
        name="plus"
        size={24}
        color={beautyTheme.colors.onBackground}
        style={{ marginRight: 15 }}
      />
    </TouchableOpacity>
  </View>
);

const CustomerListWithDrawer = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState<ToggleEnum>('day');
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const { data: clients = [], refetch } = useQuery<CustomerType[]>({
    queryKey: [getList.queryKey],
    queryFn: async () => {
      const { data } = await api.get(getList.path);
      return data;
    },
  });

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  const handleSearchbarToggle = () => {
    Keyboard.dismiss();
    setSearchbarOpen((prev) => !prev);
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
        screenOptions={{
          headerStyle: { backgroundColor: beautyTheme.colors.background },
          drawerType: 'front',
          headerTintColor: beautyTheme.colors.onBackground,
          drawerActiveBackgroundColor: beautyTheme.colors.tertiary,
          drawerActiveTintColor: beautyTheme.colors.onTertiary,
          overlayColor: beautyTheme.colors.elevation.level1,
          drawerStyle: { backgroundColor: beautyTheme.colors.background },
        }}
      >
        <Drawer.Screen
          name="CustomerListDrawer"
          options={{
            title: t('navigation.clientsBase'),
            headerRight: () => (
              <HeaderRight onAddPress={toggleForm} onSearchPress={handleSearchbarToggle} />
            ),
          }}
        >
          {() => (
            <CustomerList
              clients={clients}
              isSearchbarVisible={searchbarOpen}
              onSearchbarClose={handleSearchbarToggle}
            />
          )}
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
      <CustomBottomSheet isVisible={isFormVisible} onClose={toggleForm}>
        <CustomerForm onSubmit={async () => {}} onClose={toggleForm} />
      </CustomBottomSheet>
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
