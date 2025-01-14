import { pl } from 'i18n/pl'
export const initialCustomerFormValues = { name: '', lastName: '', phoneNumber: '', notes: '' }

export const customerFieldsConfig: Array<{
  placeholder: string
  value: string
  key: string
  keyboardType?: 'phone-pad' | 'default'
}> = [
  {
    placeholder: 'form.name',
    value: 'name',
    key: 'name',
  },
  {
    placeholder: 'form.lastName',
    value: 'lastName',
    key: 'lastName',
  },
  {
    placeholder: 'form.phone',
    value: 'phoneNumber',
    key: 'phoneNumber',
    keyboardType: 'phone-pad',
  },
  //   {
  //     placeholder: 'Notatki',
  //     value: 'notes',
  //     key: 'notes',
  //     multiline: true,
  //     maxLength: 500,
  //   },
]

// <TextInput
//           mode='outlined'
//           style={styles.input}
//           placeholder={t('form.name')}
//           value={clientForm.name}
//           onChangeText={handleChange('name')}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder={t('form.lastName')}
//           value={clientForm.lastName}
//           onChangeText={handleChange('lastName')}
//           mode='outlined'
//         />
//         <TextInput
//           style={styles.input}
//           placeholder={t('form.phone')}
//           value={clientForm.phoneNumber}
//           onChangeText={handleChange('phoneNumber')}
//           keyboardType='phone-pad'
//           mode='outlined'
//         />
//         <TextInputWithCounter
//           maxLength={500}
//           onChangeText={handleChange('notes')}
//           placeholder='Notatki'
//           value={clientForm.notes || ''}
//           multiline
//           style={[styles.textArea]}
//         />
