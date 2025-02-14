import { StyleSheet, View } from 'react-native';

import { beautyTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NoData = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Icon name="database-remove" size={32} color={beautyTheme.colors.onBackground} />
      <Text style={styles.text}>{t('global.noData')}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    marginTop: 12,
    color: beautyTheme.colors.onBackground,
    fontSize: 24,
    fontWeight: beautyTheme.fontWeight.semi,
    textAlign: 'center',
  },
});
