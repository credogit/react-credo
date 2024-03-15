/// <reference types="react" />
import { callback, CredoProps } from './types';
interface CredoProviderProps extends CredoProps {
    children: JSX.Element;
    onSuccess: callback;
    onClose: callback;
}
declare const CredoProvider: ({ children, onSuccess, onClose, ...config }: CredoProviderProps) => JSX.Element;
export default CredoProvider;
