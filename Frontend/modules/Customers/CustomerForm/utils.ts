export const initialCustomerFormValues = { name: '', lastName: '', phoneNumber: '', notes: '' };

export const customerFieldsConfig: Array<{
  placeholder: string;
  value: string;
  key: string;
  keyboardType?: 'phone-pad' | 'default';
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
];
