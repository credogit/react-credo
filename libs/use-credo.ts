import {useEffect} from 'react';
import {HookConfig, InitializePayment} from './types';
import useCredoScript from './credo-script';
import {callCredoPop} from './credo-actions';

export default function useCredoPayment(hookConfig: HookConfig): InitializePayment {
  const [scriptLoaded, scriptError] = useCredoScript();

  function initializePayment({config, onSuccess, onClose}: Parameters<InitializePayment>[0]): void {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }

    const args = {...hookConfig, ...config};

    const {
      publicKey,
      firstname,
      lastname,
      phone,
      email,
      amount,
      reference,
      metadata = {},
      currency = 'NGN',
      channels,
      label = '',
      plan = '',
      quantity = '',
      subaccount = '',
      transaction_charge = 0,
      bearer = 'account',
      split,
      split_code,
    } = args;

    if (scriptLoaded) {
      const credoArgs: Record<string, any> = {
        callback: onSuccess ? onSuccess : () => null,
        onClose: onClose ? onClose : () => null,
        key: publicKey,
        ref: reference,
        email,
        firstname,
        lastname,
        phone,
        amount,
        currency,
        plan,
        quantity,
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
        'data-custom-button': args['data-custom-button'] || '',
      };
      callCredoPop(credoArgs);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }
  }, [scriptError]);

  return initializePayment;
}
