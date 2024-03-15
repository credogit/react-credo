/// <reference types="react" />
import { InitializePayment, CredoProps } from './types';
type ICredoContext = {
    config: CredoProps;
    initializePayment: InitializePayment;
    onSuccess: () => void;
    onClose: () => void;
};
declare const CredoContext: import("react").Context<ICredoContext>;
export default CredoContext;
