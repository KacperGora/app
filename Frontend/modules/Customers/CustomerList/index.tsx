import React, { useEffect, useRef, useState } from 'react';

import { Animated, FlatList, StyleSheet, Text } from 'react-native';

import { ScreenWrapper } from '@components';
import { beautyTheme } from '@theme';
import { CustomerType } from '@types';
import NoData from 'components/NoData';
import { useTranslation } from 'react-i18next';
import { Searchbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomerDetailListRow from '../CustomerDetailListRow';
import { styles } from './style';

type CustomerListType = {
  clients: CustomerType[];
  isSearchbarVisible: boolean;
  onSearchbarClose: () => void;
};
const CustomerList: React.FC<CustomerListType> = ({
  clients,
  isSearchbarVisible,
  onSearchbarClose,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearIconPress = () => {
    setSearchQuery('');
    onSearchbarClose();
  };
  const renderItem = ({ item }: { item: CustomerType }) => {
    return <CustomerDetailListRow customer={item} />;
  };
console.log(clients);
  useEffect(() => {
    Animated.timing(searchBarOpacity, {
      toValue: isSearchbarVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSearchbarVisible, searchBarOpacity]);

  return (
    <ScreenWrapper>
      <Animated.View style={[styles.animatedContainer, { opacity: searchBarOpacity }]}>
        {isSearchbarVisible && (
          <Searchbar
            placeholder={t('global.search')}
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            iconColor={theme.colors.primary}
            clearIcon={() => <Icon size={16} color={theme.colors.primary} name="close" />}
            value={searchQuery}
            onChangeText={searchHandler}
            onClearIconPress={handleClearIconPress}
          />
        )}
      </Animated.View>
      <FlatList
        data={clients}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={NoData}
      />
    </ScreenWrapper>
  );
};

export default CustomerList;
