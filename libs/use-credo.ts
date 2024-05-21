import {useEffect} from 'react';
import {InitializePayment, PaymentProps} from './types';
import useCredoScript from './credo-script';

export default function useCredoPayment(config: PaymentProps): InitializePayment {

  const [scriptLoaded, scriptError] = useCredoScript();

  function initializePayment(): void {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }


    if (scriptLoaded) {
      const handler = (window as any).CredoWidget && (window as any).CredoWidget.setup(config);
      if (handler) {
        handler.openIframe();
      }
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load credo inline script');
    }
  }, [scriptError]);

  return initializePayment;
}
