import { ReactNode } from 'react';
import { callback, CredoProps } from './types';
interface CredoButtonProps extends CredoProps {
    text?: string;
    className?: string;
    children?: ReactNode;
    onSuccess?: callback;
    onClose?: callback;
}
declare const CredoButton: ({ text, className, children, onSuccess, onClose, ...config }: CredoButtonProps) => JSX.Element;
export default CredoButton;
