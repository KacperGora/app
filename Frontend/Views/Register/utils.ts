import { api, apiRoutes } from '@helpers';
import { z } from 'zod';

import { RegisterForm } from './types';

const registrationSchema = z
  .object({
    username: z.string().min(3, 'usernameLength'),
    password: z.string().min(6, 'passwordLength'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsDontMatch',
    path: ['confirmPassword'],
  });

export const validateRegistration = (data: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  return registrationSchema.safeParse(data);
};

export const registerApiHandler = async (form: RegisterForm) => {
  const { data } = await api.post(apiRoutes.auth.register, form);
  return data;
};
