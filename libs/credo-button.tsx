import React, {ReactNode} from 'react';
import useCredoPayment from './use-credo';
import {callback, CredoProps} from './types';

interface CredoButtonProps extends CredoProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  onSuccess?: callback;
  onClose?: callback;
}

const CredoButton = ({
  text,
  className,
  children,
  onSuccess,
  onClose,
  ...config
}: CredoButtonProps): JSX.Element => {
  const initializePayment = useCredoPayment(config);

  return (
    <button
      className={className}
      onClick={(): void => initializePayment({config, onSuccess, onClose})}
    >
      {text || children}
    </button>
  );
};

export default CredoButton;
