import React, { useContext } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { api, apiRoutes } from '@helpers';
import dayjs from 'dayjs';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext, AuthContextType } from '../../../context/AuthContext';
import { colors } from '../../../theme/theme';

const today = dayjs().format('DD');

type TopbarProps = {
  onPress: any;
  date: string;
  displayedCalendarMonth: string;
};

const Topbar: React.FC<TopbarProps> = ({ onPress, date, displayedCalendarMonth }) => {
  const { setIsLoggedIn, userId } = useContext(AuthContext) as AuthContextType;

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await api.post(apiRoutes.auth.logout, { userId });
  };
  return (
    <View style={styles.topBar}>
      <TouchableOpacity>
        <Text style={styles.monthText}>{displayedCalendarMonth}</Text>
      </TouchableOpacity>
      <Pressable onPress={onPress} style={styles.todayWrapper}>
        <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular' }}>{today}</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 12 }}></View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  todayWrapper: {
    marginLeft: 'auto',
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 4,
    padding: 2,
  },
  monthText: {
    textTransform: 'capitalize',
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
});
