import {useState, useEffect} from 'react';

interface ScriptResult {
  loaded: boolean;
  error: boolean;
}

export default function useCredoScript(
  src: string = 'https://pay.credocentral.com/inline.js',
): [boolean, boolean] {
  const [state, setState] = useState<ScriptResult>({loaded: false, error: false});

  useEffect(() => {
    if (document.getElementById('credo-inline')) {
      setState({loaded: true, error: false});
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.id = 'credo-inline';

    const onScriptLoad = (): void => setState({loaded: true, error: false});
    const onScriptError = (): void => {
      script.remove();
      setState({loaded: true, error: true});
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [src]);

  return [state.loaded, state.error];
}
