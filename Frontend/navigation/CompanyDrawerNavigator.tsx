import React, { useRef, useState } from 'react';

import { Keyboard } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { SCREEN_NAME_CONFIG } from '@helpers';
import { CompanyServices, Employees, FinanceView } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { companyDrawerConfig } from './utils';

type FormType = 'customer' | 'employee' | 'service';

const renderDrawerIcon =
  (name: string) =>
  ({ size, color }: { size: number; color: string }) => (
    <Icon name={name} size={size} color={color} />
  );

const renderFormToggler = (onFormToggle: (formType: FormType) => void) => (
  <TouchableOpacity onPress={() => onFormToggle('service')}>
    <Icon name="plus" size={24} color="#000" style={{ marginRight: 15 }} />
  </TouchableOpacity>
);

const Drawer = createDrawerNavigator();

export const CompanyDrawerNavigator = ({}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [formType, setFormType] = useState<FormType>('customer');

  const onFormToggle = (formType: FormType) => {
    setFormType(formType);
    bottomSheetRef.current?.expand();
    Keyboard.dismiss();
  };

  return (
    <Drawer.Navigator initialRouteName="company" screenOptions={companyDrawerConfig}>
      <Drawer.Screen
        name={SCREEN_NAME_CONFIG.CompanyDashboard}
        options={{
          title: i18next.t('company.dashboard'),
          drawerIcon: renderDrawerIcon('view-dashboard'),
        }}
        component={FinanceView}
      />
      <Drawer.Screen
        name={SCREEN_NAME_CONFIG.CompanyEmployees}
        options={{
          title: i18next.t('company.employees'),
          drawerIcon: renderDrawerIcon('account-group'),
          headerRight: () => renderFormToggler(() => onFormToggle('employee')),
        }}
        component={Employees}
      />
      <Drawer.Screen
        name={SCREEN_NAME_CONFIG.CompanyServices}
        options={{
          title: i18next.t('company.services'),
          drawerIcon: renderDrawerIcon('cash-register'),
          headerRight: () => renderFormToggler(() => onFormToggle('service')),
        }}
        component={CompanyServices}
      />
    </Drawer.Navigator>
  );
};

export default CompanyDrawerNavigator;
