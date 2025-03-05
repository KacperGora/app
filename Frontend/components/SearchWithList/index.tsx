import { StyleSheet, View } from 'react-native';

import { CustomerType, ServiceType } from '@types';
import i18next from 'i18next';

import Input from '../TextInputWithCounter/index';

type SearchWithListProps = {
  label: string;
  placeholder: string;
  searchValue: string;
  list: ServiceType[] | CustomerType[];
  handleInputChange: (value: string) => void;
  renderItem: (item: ServiceType | CustomerType) => JSX.Element;
};

const SearchWithList: React.FC<SearchWithListProps> = ({
  label,
  placeholder = i18next.t('form.typeToSearch'),
  searchValue,
  list,
  handleInputChange,
  renderItem,
}) => {
  return (
    <>
      <Input
        value={searchValue}
        onChangeText={handleInputChange}
        label={label}
        placeholder={placeholder}
      />
      {Boolean(searchValue.length && list.length) && (
        <View style={styles.suggestionsContainer}>{list.map(renderItem)}</View>
      )}
    </>
  );
};

export default SearchWithList;

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginTop: 0,
    top: 60,
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
});
