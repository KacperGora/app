import React, { useCallback, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { beautyTheme } from '@theme';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

interface MinimizedFormContentProps {
  initialDateState: { start: string; end: string };
  onExpand: () => void;
  serviceName: string;
  client: string;
}

const MinimizedFormContent: React.FC<MinimizedFormContentProps> = ({
  initialDateState,
  onExpand,
  serviceName,
  client,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(''); // Prosty tytuł wydarzenia

  const formattedDate = useCallback(() => {
    const start = dayjs(initialDateState.start);
    if (!start.isValid()) return t('form.invalidDate');
    return start.locale('pl').format('ddd, MMM D, HH:mm');
  }, [initialDateState.start, t]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onExpand} activeOpacity={0.7}>
        <Text style={styles.date}>{formattedDate()}</Text>
        <Text style={styles.title} numberOfLines={1}>
          Karolina Pajor
        </Text>
        <Text style={styles.serviceName}>Manicure klasyczny</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: 8,
    padding: beautyTheme.spacing.s,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  date: {
    fontSize: 16,
    color: beautyTheme.colors.onPrimaryContainer,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: beautyTheme.colors.onPrimaryContainer,
  },
  serviceName: {
    fontSize: 14,
    color: beautyTheme.colors.onPrimaryContainer,
  },
});

export default MinimizedFormContent;
