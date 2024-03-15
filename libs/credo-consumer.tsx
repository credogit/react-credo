import React, {forwardRef, useContext, FunctionComponentElement} from 'react';
import CredoProvider from './credo-provider';
import {CredoProps} from './types';
import CredoContext from './credo-context';

interface CredoConsumerProps extends CredoProps {
  children: (arg: Record<string, any>) => any;
  onSuccess?: () => void;
  onClose?: () => void;
}

const CredoConsumerChild = ({
  children,
  ref,
}: {
  children: any;
  ref: any;
}): FunctionComponentElement<any> => {
  const {config, initializePayment, onSuccess, onClose} = useContext(CredoContext);

  const completeInitializePayment = (): void => initializePayment({config, onSuccess, onClose});
  return children({initializePayment: completeInitializePayment, ref});
};

// eslint-disable-next-line react/display-name
const CredoConsumer = forwardRef(
  (
    {children, onSuccess: paraSuccess, onClose: paraClose, ...others}: CredoConsumerProps,
    ref: any,
  ): JSX.Element => {
    const onSuccess = paraSuccess ? paraSuccess : (): any => null;
    const onClose = paraClose ? paraClose : (): any => null;
    return (
      <CredoProvider {...others} onSuccess={onSuccess} onClose={onClose}>
        <CredoConsumerChild ref={ref}>{children}</CredoConsumerChild>
      </CredoProvider>
    );
  },
);

export default CredoConsumer;
