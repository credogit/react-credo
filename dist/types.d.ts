type Currency = 'NGN' |  'USD' ;
type PaymentChannels = 'bank' | 'card' ;
type Bearer = 0 | 1;
type customerPhoneNumber = number | string;
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
    customerFirstName?: string;
    customerLastName?: string;
    customerPhoneNumber?: customerPhoneNumber;
    reference?: string;
    narration?: string;
    serviceCode?: string;
    metadata?: CredoMetadata;
    currency?: Currency;
    channels?: PaymentChannels[];
    bearer?: Bearer;
}
export type InitializePayment = (options: {
    onSuccess?: callback;
    onClose?: callback;
    config?: CredoProps;
}) => void;
export {};
