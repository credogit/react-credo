import React from 'react';
import { CredoProps } from './types';
interface CredoConsumerProps extends CredoProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: () => void;
    onClose?: () => void;
}
declare const CredoConsumer: React.ForwardRefExoticComponent<CredoConsumerProps & React.RefAttributes<unknown>>;
export default CredoConsumer;
