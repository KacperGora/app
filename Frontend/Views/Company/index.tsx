import React from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';

const Company = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View>
          <Title style={styles.heading}>Firmowy dashoboard</Title>
        </View>
        {/* <CompanyStatistics /> */}
        {/* <FinanceView /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Company;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    marginBottom: 16,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
