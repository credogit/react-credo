import { useState, useEffect } from 'react';

// noinspection JSUnresolvedReference
function useCredoScript() {
    var src = 'https://pay.credocentral.com/inline.js';
    var _a = useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        // @ts-ignore
        if (document.getElementById("credo-inline")) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            // @ts-ignore
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            script_1.id = 'credo-inline';
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                script_1.remove();
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('complete', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            // @ts-ignore
            document.body.appendChild(script_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, [src, setState]);
    return [state.loaded, state.error];
}

function useCredoPayment(config) {
    var _a = useCredoScript(), scriptLoaded = _a[0], scriptError = _a[1];
    function initializePayment() {
        if (scriptError) {
            throw new Error('Unable to load credo inline script');
        }
        if (scriptLoaded) {
            var handler = window.CredoWidget && window.CredoWidget.setup(config);
            if (handler) {
                handler.openIframe();
            }
        }
    }
    useEffect(function () {
        if (scriptError) {
            throw new Error('Unable to load credo inline script');
        }
    }, [scriptError]);
    return initializePayment;
}

export { useCredoPayment };
//# sourceMappingURL=index.es.js.map
