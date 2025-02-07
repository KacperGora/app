import React from 'react';

import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import dayjs from 'dayjs';
import { LineChart } from 'react-native-chart-kit';
import { Card, Title, ToggleButton } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
  const month = dayjs().locale('pl').subtract(i, 'month').format('MMM');
  return month;
}).reverse();

const CompanyStatistics = () => {
  return (
    <LineChart
      data={{
        labels: lastSixMonths,
        datasets: [
          {
            data: Array.from({ length: 6 }, () => Math.random() * 1000),
            color: (opacity = 1) => `rgba(58, 123, 213, ${opacity})`,
            strokeWidth: 2,
          },
          {
            data: Array.from({ length: 6 }, () => Math.random() * 1000),
            color: (opacity = 1) => `rgba(240, 128, 128, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      }}
      width={screenWidth}
      height={220}
      yAxisSuffix="PLN"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: '#F5F5F5',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#3A7BD5',
        },
      }}
      bezier
      style={{
        borderRadius: 16,
      }}
      withOuterLines
    />
  );
};

export default CompanyStatistics;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartWrapper: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginHorizontal: 4,
  },
});
