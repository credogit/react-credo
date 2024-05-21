
export type CustomField = {
  variable_name: string;
  value: string;
  display_name: string;
};

export type Metadata = {
  bankAccount: string;
  customFields: CustomField[];
};

export type PaymentProps = {

  key?: string
  amount?: number
  email?: string
  onClose: () => void
  callBack: () => void
  currency?: string
  channels?: string []
  reference?: string
  metadata?: Metadata
  callbackUrl?: string
  serviceCode?: string
  customerFirstName?: string
  customerLastName?: string
  customerPhoneNumber?: string
  bearer?: 0 | 1
  paymentLink?: string
  initializeAccount?: 0 | 1
}

export type InitializePayment = (
  config?: PaymentProps
) => void;

export {};
