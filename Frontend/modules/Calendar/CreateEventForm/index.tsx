import React, { useEffect, useState } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';

import { Button, DatePicker, Input, Loader, SearchWithList } from '@components';
import { api, apiRoutes, fromIntervalToMinutes, getFullName, useAuth } from '@helpers';
import { CompanyServicesForm } from '@modules/Company';
import { CustomerForm } from '@modules/Customers';
import { useQuery } from '@tanstack/react-query';
import { CustomerType, EventForm, EventFormOptionType, ServiceType } from '@types';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Text, Title } from 'react-native-paper';

import { styles } from './style';
import { CreateEventFormProps } from './type';
import {
  formatCurrency,
  handlePriceChange,
  initialFormState,
  isEventDurationLongerThanADay,
} from './utils';

const {
  event: {
    fetchEventOptions: { path: eventOptions, queryKey },
  },
} = apiRoutes;

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  onEventCreateRequest,
  initialState,
}) => {
  const { t } = useTranslation();
  const { userId } = useAuth();

  const { data, isLoading = false } = useQuery<{
    services: ServiceType[];
    clients: CustomerType[];
  }>({
    queryKey: [queryKey, userId],
    queryFn: async () => {
      const { data } = await api.get(eventOptions);
      return data;
    },
  });

  const [search, setSearch] = useState({ clientsSearch: '', servicesSearch: '' });
  const [form, setForm] = useState<EventForm>(() => ({
    start: initialState?.start ?? initialFormState.start,
    end: initialState?.end ?? initialFormState.end,
    clientId: initialState?.clientId ?? initialFormState.clientId,
    notes: initialState?.notes ?? initialFormState.notes,
    service: initialState?.service ?? initialFormState.service,
  }));
  const [filteredOptions, setFilteredOptions] = useState<{
    clients: CustomerType[];
    services: ServiceType[];
  }>({
    clients: [],
    services: [],
  });
  const [isOptionFormVisible, setIsOptionFormVisible] = useState<{
    client: boolean;
    service: boolean;
  }>({
    client: false,
    service: false,
  });

  const { clients, services } = filteredOptions;
  const isAddClientOptionVisible = !clients.length && Boolean(search.clientsSearch.length);
  const isAddServiceFormVisible = !services.length && Boolean(search.servicesSearch.length);

  const toggleCreateOption = (name: 'service' | 'client') => () => {
    setIsOptionFormVisible((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (name: keyof EventForm) => (value: string) => {
    if (name === 'price') {
      setForm((prev) => ({ ...prev, price: handlePriceChange(value) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionSearch = (listName: 'services' | 'clients') => (text: string) => {
    setSearch((prev) => ({ ...prev, [`${listName}Search`]: text }));
    const list = data?.[listName] || [];
    const filtered = list.filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()));
    setFilteredOptions((prev) => ({ ...prev, [listName]: filtered }));
  };

  const handleClientSelect = (client: CustomerType) => {
    const { id: clientId, name, lastName } = client;
    setForm((prev) => ({ ...prev, clientId }));
    setSearch((prev) => ({ ...prev, clientsSearch: getFullName(name, lastName) }));
    setFilteredOptions((prev) => ({ ...prev, clients: [] }));
  };

  const handleServiceSelect = (service: ServiceType) => {
    const durationMinutes = fromIntervalToMinutes(service.duration);
    const startDate = dayjs(form.start);
    if (startDate.isValid()) {
      const end = startDate.add(durationMinutes, 'minutes').toISOString();
      setForm((prev) => ({ ...prev, service: service.name, end }));
    } else {
      throw new Error('Invalid date');
    }
    setForm((prev) => ({ ...prev, price: service.price }));
    setSearch((prev) => ({ ...prev, servicesSearch: service.name }));
    setFilteredOptions((prev) => ({ ...prev, services: [] }));
  };

  const handlePriceInputBlur = (value: any) => {
    if (value) {
      const numericPrice = parseFloat(value);
      if (!isNaN(numericPrice)) {
        setForm((prev) => ({ ...prev, price: formatCurrency(numericPrice, 'PLN') }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post(apiRoutes.event.create, form);
      await onEventCreateRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setForm(initialFormState);
      setSearch({ clientsSearch: '', servicesSearch: '' });
    }
  };

  const handleSelect = (name: EventFormOptionType) => (item: ServiceType | CustomerType) => {
    if (name === 'service') {
      handleServiceSelect(item as ServiceType);
    } else {
      handleClientSelect(item as CustomerType);
    }
  };

  const renderItem = (name: EventFormOptionType) => (item: ServiceType | CustomerType) => {
    const nameValue =
      name === 'service'
        ? (item as ServiceType).name
        : getFullName((item as CustomerType).name, (item as CustomerType).lastName);
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleSelect(name)(item)}
        style={styles.suggestion}
      >
        <Text style={styles.element}>{nameValue}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setForm(
      initialState || {
        start: '',
        end: '',
        clientId: '',
        service: '',
      },
    );
  }, [initialState]);

  useEffect(() => {
    if (isEventDurationLongerThanADay(form.start, form.end)) {
      setForm((prev) => ({ ...prev, end: form.start }));
    }
  }, [form.start, form.end]);

  if (Object.values(isOptionFormVisible).some((value) => value)) {
    return isOptionFormVisible.client ? (
      <CustomerForm onSubmit={async () => {}} onClose={toggleCreateOption('client')} />
    ) : (
      <CompanyServicesForm onClose={toggleCreateOption('service')} />
    );
  }

  return (
    <>
      <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <SearchWithList
            label={t('form.selectClient')}
            placeholder={t('form.typeToSearch')}
            list={clients}
            renderItem={renderItem('customer')}
            searchValue={search.clientsSearch}
            handleInputChange={handleOptionSearch('clients')}
          />
          {isAddClientOptionVisible && (
            <Button
              label={t('form.addClient')}
              onPress={toggleCreateOption('client')}
              style={styles.addBtn}
              labelStyle={styles.btnLabel}
            />
          )}
          <SearchWithList
            label={t('form.selectService')}
            placeholder={t('form.typeToSearch')}
            list={services}
            renderItem={renderItem('service')}
            searchValue={search.servicesSearch}
            handleInputChange={handleOptionSearch('services')}
          />
          {isAddServiceFormVisible && (
            <Button
              label={t('form.addService')}
              onPress={toggleCreateOption('service')}
              style={styles.addBtn}
              labelStyle={styles.btnLabel}
            />
          )}
          <Input
            keyboardType="numeric"
            placeholder={t('form.price')}
            onChangeText={handleChange('price')}
            onBlur={handlePriceInputBlur}
            style={styles.input}
            value={form.price}
            label={t('form.price')}
          />
          <DatePicker
            label={t('calendar.startDate')}
            value={form.start}
            onChange={handleChange('start')}
            minDate={dayjs().toISOString()}
          />
          <DatePicker
            label={t('calendar.endDate')}
            value={form.end}
            onChange={handleChange('end')}
            minDate={form.start}
          />
          <Input
            maxLength={500}
            onChangeText={handleChange('notes')}
            placeholder={t('calendar.notes')}
            value={form?.notes}
            multiline
            style={[styles.input, styles.textArea]}
          />
          <Button
            label={t('form.save')}
            style={styles.submitButton}
            onPress={handleSubmit}
            labelStyle={styles.btnLabel}
          />
        </>
      )}
    </>
  );
};

export default CreateEventForm;
