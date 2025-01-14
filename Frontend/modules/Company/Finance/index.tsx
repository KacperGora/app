import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { ToggleButton, Card, Title, Button } from 'react-native-paper'
import { colors } from '../../../theme/theme'
import api from '@helpers/api'

const FinanceView = () => {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null })

  const finances = {
    dailyRevenue: 400,
    weeklyRevenue: 2800,
    monthlyRevenue: 12000,
    yearlyRevenue: 144000,
    totalCosts: 8000,
    profits: 4000,
    bankBalance: 15000,
    debt: 2000,
    financialTrend: 'wzrost',
    profitabilityIndex: 1.5,
  }

  const fetchIncome = async () => {
    const { data } = await api.get('/company/calculateIncome', { params: selectedRange })
  }

  useEffect(() => {
    fetchIncome()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Przychody ({selectedRange})</Title>
            <Text style={styles.cardText}>{getRevenue()} PLN</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Zyski i Koszty</Title>
            <Text style={styles.cardText}>Zyski: {finances.profits} PLN</Text>
            <Text style={styles.cardText}>Koszty: {finances.totalCosts} PLN</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Stan Konta</Title>
            <Text style={styles.cardText}>Saldo konta: {finances.bankBalance} PLN</Text>
            <Text style={styles.cardText}>Zadłużenie: {finances.debt} PLN</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Analizy Finansowe</Title>
            <Text style={styles.cardText}>Trend: {finances.financialTrend}</Text>
            <Text style={styles.cardText}>Wskaźnik rentowności: {finances.profitabilityIndex * 100}%</Text>
          </Card.Content>
        </Card> */}

        <Button mode='contained' style={styles.button} onPress={() => console.log('Więcej analiz')}>
          Więcej analiz
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleGroup: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
})

export default FinanceView
