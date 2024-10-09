import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

const Company = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Firma</Text>
      </View>
    </SafeAreaView>
  )
}

export default Company

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
})
