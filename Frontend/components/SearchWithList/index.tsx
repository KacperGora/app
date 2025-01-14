import { StyleSheet, View } from 'react-native'
import i18next from 'i18next'

import Input from '@components/TextInputWithCounter'
import { Customer } from '@modules/Customers/CustomerList'
import { Service } from '@modules/Company/CompanyServices'

type SearchWithListProps = {
  label: string
  placeholder: string
  searchValue: string
  list: Service[] | Customer[]
  handleInputChange: (value: string) => void
  renderItem: (item: Service | Customer) => JSX.Element
}

const SearchWithList: React.FC<SearchWithListProps> = ({
  label,
  placeholder = i18next.t('form.typeToSearch'),
  searchValue,
  list,
  handleInputChange,
  renderItem,
}) => {
  return (
    <View style={styles.searchWithList}>
      <Input style={styles.input} value={searchValue} onChangeText={handleInputChange} label={label} placeholder={placeholder} />
      {Boolean(searchValue.length && list.length) && <View style={styles.suggestionsContainer}>{list.map(renderItem)}</View>}
    </View>
  )
}

export default SearchWithList

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  searchWithList: {},
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginTop: 0,
    top: '70%',
    position: 'absolute',
    width: '100%',
    marginBottom: 0,
    elevation: 3,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
})
