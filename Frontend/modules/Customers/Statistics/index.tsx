import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { ToggleType } from '../../../Views/Customers'


const Statistics: React.FC<ToggleType> = ({ toggle }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.toggleContainer}>
        <View>
          <Text>xd</Text>
        </View>
      </View>
      <Card style={styles.card}>
        <Text style={styles.statText}>Nowych klientów w {toggle}: 10</Text>
        <Text style={styles.statText}>Ostatnio dodany klient: Joanna Dobosz</Text>
        <Text style={styles.statText}>Najczęściej odwiedzający klient: Jan Kowalski</Text>
        <Text style={styles.statText}>Ostatni raz widziany klient: Renata Mlyczyńska</Text>
      </Card>
      <Card style={styles.card}>
        <Title style={styles.statText}>Najlepsi klienci</Title>
        <Text style={styles.statText}>Monika Mlyczyńska - 560PLN</Text>
        <Text style={styles.statText}>Najczęściej odwiedzający klient: Jan Kowalski</Text>
        <Text style={styles.statText}>Ostatni raz widziany klient: Renata Mlyczyńska</Text>
      </Card>
    </ScrollView>
  )
}

export default Statistics

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    padding: 20,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  statText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
  },
})
