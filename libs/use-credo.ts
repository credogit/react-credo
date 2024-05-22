import {useEffect, useCallback} from 'react';
import {InitializePayment, PaymentProps} from './types';
import useCredoScript from './credo-script';

export default function useCredoPayment(config: PaymentProps): InitializePayment {
  const [scriptLoaded, scriptError] = useCredoScript();

  const initializePayment = useCallback((): void => {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }

    if (scriptLoaded) {
      const {CredoWidget} = window as any;
      if (CredoWidget) {
        const {setup} = CredoWidget;
        const handler = setup(config);
        if (handler) {
          const {openIframe} = handler;
          openIframe();
        }
      }
    }
  }, [scriptLoaded, scriptError, config]);

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }
  }, [scriptError]);

  return initializePayment;
}
