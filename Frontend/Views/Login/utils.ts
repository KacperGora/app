import { api, apiRoutes } from '@helpers';
import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

import { LoginForm, LoginSuccess } from './types';

const loginSchema = z.object({
  username: z.string().min(3, 'usernameLength'),
  password: z.string().min(6, 'passwordLength'),
});

export const validateLogin = (data: { username: string; password: string }) => {
  return loginSchema.safeParse(data);
};

export const loginApiHandler = async (form: LoginForm) => {
  const { data } = await api.post(apiRoutes.auth.login, form);
  return data;
};

export const loginSuccessHandler = async (
  data: LoginSuccess,
  setIsLoggedIn: (value: boolean) => void,
  setUserId: (value: string) => void,
) => {
  try {
    const { accessToken, refreshToken, user } = data;
    console.log(data);
    if (!accessToken || !refreshToken || !user?.id) {
      throw new Error('Invalid login response data');
    }

    await Promise.all([
      SecureStore.setItemAsync('accessToken', accessToken),
      SecureStore.setItemAsync('refreshToken', refreshToken),
    ]);

    setUserId(user.id);
    setIsLoggedIn(true);
  } catch (error) {
    console.log(error);
    throw new Error('Error while handling login success');
  }
};
