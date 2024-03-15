import {createContext} from 'react';
import {InitializePayment, CredoProps} from './types';

type ICredoContext = {
  config: CredoProps;
  initializePayment: InitializePayment;
  onSuccess: () => void;
  onClose: () => void;
};

const CredoContext = createContext<ICredoContext>({
  config: {} as CredoProps,
  initializePayment: () => null,
  onSuccess: () => null,
  onClose: () => null,
});

export default CredoContext;
