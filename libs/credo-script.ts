// noinspection JSUnresolvedReference

import {useState, useEffect} from 'react';

interface IScriptResult {
  loaded: boolean;
  error: boolean;
}

export default function useCredoScript(): boolean[] {

  const src = 'https://pay.credocentral.com/inline.js';

  const [state, setState] = useState<IScriptResult>({
    loaded: false,
    error: false,
  });

  useEffect((): any => {

    // @ts-ignore
    if (document.getElementById("credo-inline")) {
      setState({
        loaded: true,
        error: false,
      });
    } else {

      // @ts-ignore
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.id = 'credo-inline'

      const onScriptLoad = (): void => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = (): void => {
        script.remove();
        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('complete', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // @ts-ignore
      document.body.appendChild(script);

      return (): void => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
  }, [src, setState]);

  return [state.loaded, state.error];
}
