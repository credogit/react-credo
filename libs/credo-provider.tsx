import React from 'react';
import CredoContext from './credo-context';
import useCredoPayment from './use-credo';
import {callback, CredoProps} from './types';

interface CredoProviderProps extends CredoProps {
  children: JSX.Element;
  onSuccess: callback;
  onClose: callback;
}

const CredoProvider = ({
  children,
  onSuccess,
  onClose,
  ...config
}: CredoProviderProps): JSX.Element => {
  const initializePayment = useCredoPayment(config);

  return (
    <CredoContext.Provider value={{config, initializePayment, onSuccess, onClose}}>
      {children}
    </CredoContext.Provider>
  );
};

export default CredoProvider;
