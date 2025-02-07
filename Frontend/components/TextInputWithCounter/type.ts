export interface TextInputWithCounterProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (text: string) => void;
  maxLength?: number;
  multiline?: boolean;
  label?: string;
  style?: object;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  errorMessage?: string;
  isPassword?: boolean;
}
