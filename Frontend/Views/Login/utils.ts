import { LoginSuccess } from './types';
import * as SecureStore from 'expo-secure-store';
import { AuthContext, AuthContextType } from 'context/AuthContext';
import { useContext } from 'react';

export const loginSuccessHandler = async (data: LoginSuccess) => {
  const { setIsLoggedIn, setUserId, isLoggedIn } = useContext(AuthContext) as AuthContextType;
  console.log('it should be logged');
  await SecureStore.setItemAsync('accessToken', data.accessToken).catch((error) => {
    console.error('Error saving access token:', error);
  });
  await SecureStore.setItemAsync('refreshToken', data.refreshToken).catch((error) => {
    console.error('Error saving refresh token:', error);
  });
  setUserId(data.user.id);
  setIsLoggedIn(true);
  console.log(isLoggedIn);
};
