import React, { useCallback, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';

import { Loader } from '@components';
import { api } from '@helpers';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { ServiceType } from '@types';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import { colors } from 'theme/theme';

import ServiceItem from '../ServicesItem';

const fetchServices = async (payload: { sortOrder: string; sortBy: string; search?: string }) => {
  try {
    const { data } = await api.get('/company/getServices', {
      params: payload,
    });
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services');
  }
};

type PayloadType = {
  sortOrder: 'ASC' | 'DESC';
  sortBy: keyof ServiceType;
  search?: string;
};

const CompanyServices = () => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');
  const [payload, setPayload] = useState<PayloadType>({
    sortOrder: 'DESC',
    sortBy: 'name',
  });

  const { data, isLoading, refetch } = useQuery<ServiceType[]>({
    queryKey: ['services', payload],
    queryFn: () => fetchServices(payload),
    enabled: true,
  });

  const debouncedHandleFiltersChange = useCallback(
    debounce((search: string) => {
      setPayload((prev) => ({ ...prev, search }));
    }, 300),
    [],
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    debouncedHandleFiltersChange(text);
  };

  const RenderServiceItem = ({
    item,
    refetchFn,
  }: {
    item: ServiceType;
    refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<ServiceType[], Error>>;
  }) => {
    return <ServiceItem {...item} refetchFn={refetchFn} />;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder={t('filters.searchForService')}
        value={searchText}
        onChangeText={handleSearchChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <RenderServiceItem item={item} refetchFn={refetch} />}
        />
      )}
    </View>
  );
};

export default CompanyServices;

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: colors.background,
    borderRadius: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
