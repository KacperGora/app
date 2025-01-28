import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import CustomerDetailListRow from '../CustomerDetailListRow';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CustomerType } from '@types';

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
        mode='view'
        style={{ backgroundColor: '#fff' }}
        value={searchQuery}
        onChangeText={searchHandler}
        onClearIconPress={() => setSearchQuery('')}
      />
      <FlatList data={clients} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
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
