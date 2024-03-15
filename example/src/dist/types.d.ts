type Currency = 'NGN' |  'USD' ;
type PaymentChannels = 'bank' | 'card' ;
type Bearer = 0 | 1;
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
    currency?: Currency;
    channels?: PaymentChannels[];
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
    config?: CredoProps;
}) => void;
export {};
