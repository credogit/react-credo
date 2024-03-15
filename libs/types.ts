export type Currency = 'NGN' | 'GHS' | 'USD' | 'ZAR' | 'KES' | 'XOF';

export type PaymentChannels =
  | 'bank'
  | 'card'
  | 'qr'
  | 'ussd'
  | 'mobile_money'
  | 'eft'
  | 'bank_transfer'
  | 'payattitude';

type Bearer = 'account' | 'subaccount';

type phone = number | string;

interface CredoCustomFields {
  display_name: string;
  variable_name: string;
  value: any;
}

interface CredoMetadata {
  custom_fields: CredoCustomFields[];
}

interface CredoMetadata {
  [key: string]: any;
}

export type callback = (response?: any) => void;

export interface CredoProps {
  publicKey: string;
  email: string;
  amount: number;
  firstname?: string;
  lastname?: string;
  phone?: phone;
  reference?: string;
  metadata?: CredoMetadata;
  currency?: Currency | string;
  channels?: PaymentChannels[] | string[];
  label?: string;
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: Bearer;
  'data-custom-button'?: string;
  split_code?: string;
  split?: Record<string, any>;
}

export type InitializePayment = (options: {
  onSuccess?: callback;
  onClose?: callback;
  config?: Omit<CredoProps, 'publicKey'>;
}) => void;

export type HookConfig = Omit<Partial<CredoProps>, 'publicKey'> &
  Pick<CredoProps, 'publicKey'>;
