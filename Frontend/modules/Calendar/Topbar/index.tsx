import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import dayjs from 'dayjs'
import { AuthContext, AuthContextType } from '../../../context/AuthContext'
import { colors } from '../../../theme/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const today = dayjs().format('DD')

type TopbarProps = {
  onPress: any
  date: string
  displayedCalendarMonth: string
}

const Topbar: React.FC<TopbarProps> = ({ onPress, date, displayedCalendarMonth }) => {
  const { setIsLoggedIn, userId } = useContext(AuthContext) as AuthContextType
  return (
    <View style={styles.topBar}>
      <TouchableOpacity>
        <Text style={styles.monthText}>{displayedCalendarMonth}</Text>
      </TouchableOpacity>
      <Pressable onPress={onPress} style={styles.todayWrapper}>
        <Text style={{ fontSize: 12, fontFamily: 'Lato-Regular' }}>{today}</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 12 }}></View>
      <Pressable style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
        <Icon name='logout' size={24} color={colors.textPrimary} />
      </Pressable>
    </View>
  )
}

export default Topbar

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  todayWrapper: {
    marginLeft: 'auto',
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 4,
    padding: 2,
  },
  monthText: {
    textTransform: 'capitalize',
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
})
