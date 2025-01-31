import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from 'context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { Keyboard } from 'react-native';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };
  return [isVisible, toggleModal] as const;
};

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('assets/fonts/Lato-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.preventAutoHideAsync();
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  return fontsLoaded;
};

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, setLogin, setUserId, userId } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        setIsLoggedIn(Boolean(token));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, [setIsLoggedIn, setLogin]);

  return { isLoggedIn, loading, setLogin, setUserId, userId, setIsLoggedIn };
};

export const useKeyboardStatus = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const keyboardDidShow = () => {
      setKeyboardStatus(true);
    };

    const keyboardDidHide = () => {
      setKeyboardStatus(false);
    };

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return keyboardStatus;
};
