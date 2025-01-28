export interface Client {
  name: string;
  lastName: string;
  phoneNumber?: string;
  notes?: string;
}

export type CustomerComponentProps = {
  onSubmit: () => Promise<void>;
  onClose?: () => void;
};
