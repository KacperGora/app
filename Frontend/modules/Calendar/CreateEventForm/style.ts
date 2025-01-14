import { Dimensions, StyleSheet } from 'react-native'
import { colors } from 'theme/theme'

const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
  formTitle: {
    marginBottom: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    width: width,
    backgroundColor: colors.background,
  },
  suggestion: {
    paddingVertical: 0,
    width: 'auto',
    borderRadius: 4,
  },
  element: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  dateTimeContainer: {
    marginBottom: 8,
  },
  submitButton: {
    paddingVertical: 2,
    backgroundColor: 'black',
    color: 'white',
  },
  textArea: {
    height: 100,
    borderColor: 'black',
  },
  btnLabel: {
    color: 'white',
  }
})
