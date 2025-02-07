import React, { useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';

import CustomerDetailListRow from '../CustomerDetailListRow';

const CustomerList: React.FC<{ clients: CustomerType[] }> = ({ clients }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (value: string) => {
    setSearchQuery(value);
  };

  const renderItem = ({ item }: { item: CustomerType }) => {
    return <CustomerDetailListRow customer={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder={t('global.search')}
        mode="view"
        style={{ backgroundColor: '#fff' }}
        value={searchQuery}
        onChangeText={searchHandler}
        onClearIconPress={() => setSearchQuery('')}
      />
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
