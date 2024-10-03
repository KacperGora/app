import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import dayjs from 'dayjs'
import { AuthContext, AuthContextType } from '../../../context/AuthContext'
import pl from 'dayjs/locale/pl'
import { useTranslation } from 'react-i18next'

const Topbar = () => {
  const { t } = useTranslation()
  const { login, setIsLoggedIn } = useContext(AuthContext) as AuthContextType
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'))

  return (
    <SafeAreaView style={styles.topBar}>
      <View>
        <Text>{login}</Text>
        <Text>{dayjs().locale(pl).format('D MMM').toString()}</Text>
      </View>
      <Pressable onPress={() => setIsLoggedIn(false)}>
        <Text>{t('global.logout')}</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Topbar

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  dayLabel: {
    fontSize: 12,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  dayWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
})
