import React, { useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Keyboard, StyleSheet } from 'react-native'
import i18next from 'i18next'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FinanceView from '@modules/Company/Finance'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Employees from '@modules/Company/Employees'
import BottomSheetFormWrapper from '@components/BottomSheetFormWrapper'
import BottomSheet from '@gorhom/bottom-sheet'
import CustomerForm from '@modules/Customers/CustomerForm'
import EmployeeForm from '@modules/Company/EmployeeForm'
import CompanyServices from '@modules/Company/CompanyServices'
import CompanyServicesForm from '@modules/Company/CompanyServiesForm'

const Drawer = createDrawerNavigator()
type FormType = 'customer' | 'employee' | 'service'

export const CompanyDrawerNavigator = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [formType, setFormType] = useState<FormType>('customer')

  const onFormToggle = (formType: FormType) => {
    setFormType(formType)
    bottomSheetRef.current?.expand()
    Keyboard.dismiss()
  }
  return (
    <>
      <Drawer.Navigator
        initialRouteName='company'
        screenOptions={{
          drawerType: 'front',
          headerRightContainerStyle: styles.headerRightContainer,
          headerTintColor: '#333',
          drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
          drawerActiveTintColor: '#333',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          headerTitleContainerStyle: styles.headerTitleContainer,
        }}
      >
        <Drawer.Screen
          name={i18next.t('company.dashboard')}
          options={{
            drawerIcon: () => <Icon name='view-dashboard' size={24} />,
          }}
          component={FinanceView}
        />
        <Drawer.Screen
          name={i18next.t('company.employees')}
          options={{
            drawerIcon: () => <Icon name='account-group' size={24} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => onFormToggle('employee')}>
                <Icon name='plus' size={24} color='#000' style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          }}
          component={Employees}
        />
        <Drawer.Screen
          name={i18next.t('company.services')}
          options={{
            drawerIcon: () => <Icon name='cash-register' size={24} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => onFormToggle('service')}>
                <Icon name='plus' size={24} color='#000' style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          }}
          component={CompanyServices}
        />
      </Drawer.Navigator>
      <BottomSheetFormWrapper ref={bottomSheetRef}>
        {formType === 'employee' && <EmployeeForm />}
        {formType === 'service' && <CompanyServicesForm />}
      </BottomSheetFormWrapper>
    </>
  )
}

const styles = StyleSheet.create({
  headerRightContainer: {},
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CompanyDrawerNavigator
