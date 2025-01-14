import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native'
import FinanceView from '../../modules/Company/Finance'
import CompanyStatistics from '../../modules/Company/CompanyStatistic'
import { ScrollView } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import { colors } from '../../theme/theme'
import Carousel from 'react-native-reanimated-carousel'
import api from '@helpers/api'

const width = Dimensions.get('window').width

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
  )
}

export default Company

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
})
