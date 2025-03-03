import React, { useState } from 'react';

import { Keyboard, TouchableOpacity, View } from 'react-native';

import { api, apiRoutes, SCREEN_NAME_CONFIG } from '@helpers';
import { CustomerList, Statistics } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { customerDrawerScreenConfig } from './utils';

const {
  client: { getList },
} = apiRoutes;

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

export const CustomerListWithDrawer = () => {
  const { t } = useTranslation();
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const [isAddCustomerFormVisible, setAddCustomerFormVisible] = useState(false);

  const { data: clients = [], refetch } = useQuery<CustomerType[]>({
    queryKey: [getList.queryKey],
    queryFn: async () => {
      const { data } = await api.get(getList.path);
      return data;
    },
  });

  const toggleForm = () => {
    setAddCustomerFormVisible((prev) => !prev);
  };

  const renderHeaderRight = () => (
    <HeaderRight onAddPress={toggleForm} onSearchPress={handleSearchbarToggle} />
  );

  const handleSearchbarToggle = () => {
    Keyboard.dismiss();
    setSearchbarOpen((prev) => !prev);
  };

  const handleFormClose = async () => {
    Keyboard.dismiss();
    await refetch();
  };

  return (
    <Drawer.Navigator
      initialRouteName={SCREEN_NAME_CONFIG.CustomerListDrawer}
      screenOptions={customerDrawerScreenConfig}
    >
      <Drawer.Screen
        name={SCREEN_NAME_CONFIG.CustomerList}
        options={{
          title: t('navigation.clientsBase'),
          headerRight: renderHeaderRight,
        }}
      >
        {() => (
          <CustomerList
            clients={clients}
            isSearchbarVisible={searchbarOpen}
            onSearchbarClose={handleSearchbarToggle}
            isAddCustomerFormVisible={isAddCustomerFormVisible}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name={SCREEN_NAME_CONFIG.CustomerStatistics}
        component={Statistics}
        options={{
          title: t('navigation.statistics'),
        }}
      />
    </Drawer.Navigator>
  );
};
