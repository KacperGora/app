import React, { useContext } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { api, apiRoutes } from '@helpers';
import { beautyTheme } from '@theme';
import dayjs from 'dayjs';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext, AuthContextType } from '../../../context/AuthContext';

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
        <Text style={styles.todayText}>{today}</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 12 }}></View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color={beautyTheme.colors.primary} />
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
    backgroundColor: beautyTheme.colors.background,
    paddingVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: beautyTheme.colors.background,
  },
  todayWrapper: {
    marginLeft: 'auto',
    marginRight: 16,
    borderWidth: 2,
    borderColor: beautyTheme.colors.primary,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: beautyTheme.colors.primary,
    backgroundColor: beautyTheme.colors.background,
  },
  todayText: {
    fontSize: 12,
    color: beautyTheme.colors.onBackground,
  },
  monthText: {
    textTransform: 'capitalize',
    color: beautyTheme.colors.onBackground,
    fontSize: 16,
    fontWeight: '600',
  },
});
