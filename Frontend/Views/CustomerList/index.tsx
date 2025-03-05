import React, { useEffect, useRef, useState } from 'react';

import { Animated, FlatList } from 'react-native';

import { NoData, ScreenWrapper } from '@components';
import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';
import { Searchbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomerDetailListRow from '../../modules/Customers/CustomerDetailListRow';
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
        style={styles.list}
        data={clients}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={NoData}
      />
    </ScreenWrapper>
  );
};

export default CustomerList;
